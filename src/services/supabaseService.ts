import { supabase } from '../lib/supabase';
import { User, Booking, WasteType } from '../types';

export const supabaseService = {
    // Auth
    async recordLogin(userId: string, email: string) {
        try {
            await supabase.from('login_history').insert({
                user_id: userId,
                email: email,
                user_agent: navigator.userAgent,
            });
        } catch (error) {
            console.error('Error recording login history:', error);
        }
    },

    async getUserProfile(user: any) {
        if (!user) return null;

        const [userProfileRes, adminProfileRes] = await Promise.all([
            supabase
                .from('user_profiles')
                .select('id, full_name, phone, email')
                .eq('id', user.id)
                .single(),
            supabase
                .from('admin_profiles')
                .select('id, full_name, phone, email')
                .eq('id', user.id)
                .single()
        ]);

        const profile = userProfileRes.data || adminProfileRes.data;
        const role = adminProfileRes.data ? 'admin' : (user.user_metadata?.role || 'user');

        return {
            id: user.id,
            email: user.email!,
            name: profile?.full_name || user.user_metadata?.full_name || 'User',
            phone: profile?.phone || user.user_metadata?.phone || '',
            role: role
        } as User;
    },

    async signUp(email: string, password: string, name: string, phone: string, role: string = 'user') {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: name,
                    phone: phone,
                    role: role,
                },
            },
        });

        if (error) throw error;

        if (data.user) {
            const table = role === 'admin' ? 'admin_profiles' : 'user_profiles';
            await supabase
                .from(table)
                .upsert({
                    id: data.user.id,
                    email: email,
                    full_name: name,
                    phone: phone,
                });

            await this.recordLogin(data.user.id, email);
            return this.getUserProfile(data.user);
        }

        return null;
    },

    async signIn(email: string, password: string) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw error;

        if (data.user) {
            await this.recordLogin(data.user.id, email);
            return this.getUserProfile(data.user);
        }

        return null;
    },

    async resetPassword(email: string) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: window.location.origin,
        });
        if (error) throw error;
    },

    async signOut() {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    },

    async getCurrentUser() {
        const { data: { user } } = await supabase.auth.getUser();
        return this.getUserProfile(user);
    },

    async getLoginHistory(userId?: string) {
        let query = supabase
            .from('login_history')
            .select('id, login_at, email, user_agent')
            .order('login_at', { ascending: false });

        if (userId) {
            query = query.eq('user_id', userId);
        }

        const { data, error } = await query;
        if (error) throw error;
        return data;
    },

    // Bookings
    async getBookings(userId?: string) {
        let query = supabase
            .from('bookings')
            .select('id, user_id, waste_type, address, lat, lng, scheduled_time, status, created_at')
            .order('created_at', { ascending: false });

        if (userId) {
            query = query.eq('user_id', userId);
        }

        const { data, error } = await query;
        if (error) throw error;

        return data.map(b => ({
            id: b.id,
            userId: b.user_id,
            wasteType: b.waste_type as WasteType,
            location: {
                address: b.address,
                lat: b.lat,
                lng: b.lng
            },
            scheduledTime: b.scheduled_time,
            status: b.status as Booking['status'],
            createdAt: b.created_at
        })) as Booking[];
    },

    async addBooking(booking: Omit<Booking, 'id' | 'createdAt'>) {
        const { data, error } = await supabase
            .from('bookings')
            .insert({
                user_id: booking.userId,
                waste_type: booking.wasteType,
                address: booking.location.address,
                lat: booking.location.lat,
                lng: booking.location.lng,
                scheduled_time: booking.scheduledTime,
                status: booking.status
            })
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async updateBookingStatus(id: string, status: Booking['status']) {
        const { error } = await supabase
            .from('bookings')
            .update({ status })
            .eq('id', id);

        if (error) throw error;
    },

    // Admin
    async getAllUsers() {
        const { data, error } = await supabase
            .from('user_profiles')
            .select('id, email, full_name, phone');
        if (error) throw error;
        return data.map(p => ({
            id: p.id,
            email: p.email,
            name: p.full_name,
            phone: p.phone,
            role: 'user'
        })) as User[];
    }
};
