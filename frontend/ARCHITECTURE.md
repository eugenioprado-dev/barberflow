# Arquitetura — André Dias Studio

## Visão geral

O André Dias Studio é uma aplicação web desenvolvida com React, TypeScript, Vite, Tailwind CSS e Supabase.

O projeto possui:

- Site público
- Painel administrativo
- CRUDs
- Camada de dados
- Integração com Supabase
- Context API para dados globais

---

## Fluxo principal

```text
Component
   ↓
Hook
   ↓
Context / Store
   ↓
Service
   ↓
Supabase
   ↓
PostgreSQL