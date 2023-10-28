import { NextResponse } from 'next/server'

export function factory(functions, index = 0) {
    const current = functions[index];

    if (current) {
        const next = factory(functions, index + 1);
        return current(next);
    }

    return () => NextResponse.next();
}