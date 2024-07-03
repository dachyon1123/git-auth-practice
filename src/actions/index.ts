'use server'

import * as auth from '@/auth'

export async function signIn() {
    return auth.signIn('github'); // Pass a string defining the provider (can have multiple)
}

export async function signOut() {
    return auth.signOut();
}
