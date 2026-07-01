# ADR-001 — BaseCrudService

## Status

Aceito

---

## Contexto

O projeto possui diversos módulos que implementam operações de CRUD:

- Categorias
- Profissionais
- Serviços
- Galeria
- Depoimentos

Todos compartilham as mesmas operações básicas:

- Buscar todos
- Buscar por ID
- Inserir
- Atualizar
- Excluir

Repetir esse código em cada Service aumentaria a manutenção e dificultaria a evolução do projeto.

---

## Decisão

Foi criada uma classe abstrata chamada BaseCrudService.

Ela será responsável apenas pelas operações genéricas de CRUD.

Não conterá regras de negócio.

Cada módulo implementará sua própria classe herdando dela.

Exemplo:

```text
CategoryService
        │
        ▼
BaseCrudService<Category>
        │
        ▼
Supabase
```

---

## Responsabilidades do BaseCrudService

- getAll()
- getById()
- create()
- update()
- delete()

---

## Não faz parte do BaseCrudService

Os métodos abaixo pertencem aos Services específicos:

- getActive()
- getAvailable()
- getToday()
- search()
- getByCategory()

Esses métodos representam regras de negócio.

---

## Benefícios

- Elimina duplicação de código
- Centraliza operações de CRUD
- Facilita manutenção
- Facilita testes
- Facilita criação de novos módulos

---

## Consequências

Todos os Services do projeto deverão herdar do BaseCrudService.

Novos módulos deverão seguir a mesma arquitetura.

---

## Data

01/07/2026