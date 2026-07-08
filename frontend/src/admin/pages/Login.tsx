import { useEffect, useState, type FormEvent } from "react";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../../hooks/useAuth";

interface LocationState {
    from?: {
        pathname?: string;
    };
}

export function Login() {
    const navigate = useNavigate();
    const location = useLocation();

    const { login, isAuthenticated, loading } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const state = location.state as LocationState | null;
    const redirectTo = state?.from?.pathname ?? "/admin/dashboard";

    useEffect(() => {
        if (isAuthenticated) {
            navigate(redirectTo, { replace: true });
        }
    }, [isAuthenticated, navigate, redirectTo]);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!email || !password) {
            toast.error("Informe email e senha.");
            return;
        }

        try {
            setSubmitting(true);

            await login(email, password);

            toast.success("Login realizado com sucesso.");
            navigate(redirectTo, { replace: true });
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            toast.error("Email ou senha inválidos.");
        } finally {
            setSubmitting(false);
        }
    }

    if (!loading && isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
            <section className="w-full max-w-md rounded-[2rem] border border-white/10 bg-zinc-950 p-8 shadow-2xl">
                <div className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
                        André Dias Studio
                    </p>

                    <h1 className="mt-4 text-3xl font-bold">
                        Acesso ao Painel
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-zinc-500">
                        Entre com seu email e senha para gerenciar o site.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-5"
                >
                    <label className="block">
                        <span className="mb-2 block text-sm font-medium text-zinc-300">
                            Email
                        </span>

                        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black px-4 py-3 focus-within:border-amber-500/60">
                            <FaEnvelope className="text-zinc-500" />

                            <input
                                type="email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                placeholder="admin@email.com"
                                className="w-full bg-transparent text-white outline-none placeholder:text-zinc-600"
                            />
                        </div>
                    </label>

                    <label className="block">
                        <span className="mb-2 block text-sm font-medium text-zinc-300">
                            Senha
                        </span>

                        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black px-4 py-3 focus-within:border-amber-500/60">
                            <FaLock className="text-zinc-500" />

                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                placeholder="Digite sua senha"
                                className="w-full bg-transparent text-white outline-none placeholder:text-zinc-600"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword((current) => !current)
                                }
                                aria-label={
                                    showPassword
                                        ? "Ocultar senha"
                                        : "Mostrar senha"
                                }
                                className="text-zinc-500 transition hover:text-amber-400"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </label>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full rounded-2xl bg-amber-500 px-5 py-4 font-bold text-black transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {submitting ? "Entrando..." : "Entrar"}
                    </button>
                </form>

                <p className="mt-6 text-center text-xs leading-6 text-zinc-600">
                    Área restrita para administração do site.
                </p>
            </section>
        </main>
    );
}