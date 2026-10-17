import type { Metadata } from 'next';
import './globals.css';
import { BookingProvider } from './booking-state';
export const metadata: Metadata = { title: 'Forma — Salão Feminino', description: 'Seu momento, do seu jeito. Demonstração de solicitação de agendamento para salão feminino.' };
export default function Layout({children}:{children:React.ReactNode}) { return <html lang="pt-BR"><body><BookingProvider>{children}</BookingProvider></body></html> }
