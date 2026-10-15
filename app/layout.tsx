import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Forma — Salão & Barbearia', description: 'Seu momento, do seu jeito. Demonstração de solicitação de agendamento para salão e barbearia.' };
export default function Layout({children}:{children:React.ReactNode}) { return <html lang="pt-BR"><body>{children}</body></html> }
