import {
    createContext,
    useCallback,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import type { Testimonial } from "../models/Testimonial";
import { testimonialService } from "../services/testimonialService";

export interface TestimonialContextData {
    testimonials: Testimonial[];
    loading: boolean;

    reload: () => Promise<void>;

    createTestimonial: (
        data: Omit<Testimonial, "id">
    ) => Promise<Testimonial>;

    updateTestimonial: (
        id: number,
        data: Partial<Omit<Testimonial, "id">>
    ) => Promise<Testimonial>;

    deleteTestimonial: (id: number) => Promise<void>;
}

export const TestimonialContext =
    createContext<TestimonialContextData | null>(null);

interface Props {
    children: ReactNode;
}

export function TestimonialProvider({
    children,
}: Props) {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);

    const reload = useCallback(async () => {
        setLoading(true);

        try {
            const data =
                await testimonialService.getAll();

            setTestimonials(data);
        } finally {
            setLoading(false);
        }
    }, []);

    async function createTestimonial(
        data: Omit<Testimonial, "id">
    ) {
        const created =
            await testimonialService.create(data);

        await reload();

        return created;
    }

    async function updateTestimonial(
        id: number,
        data: Partial<Omit<Testimonial, "id">>
    ) {
        const updated =
            await testimonialService.update(id, data);

        await reload();

        return updated;
    }

    async function deleteTestimonial(id: number) {
        await testimonialService.delete(id);

        await reload();
    }

    useEffect(() => {
        void reload();
    }, [reload]);

    return (
        <TestimonialContext.Provider
            value={{
                testimonials,
                loading,
                reload,
                createTestimonial,
                updateTestimonial,
                deleteTestimonial,
            }}
        >
            {children}
        </TestimonialContext.Provider>
    );
}