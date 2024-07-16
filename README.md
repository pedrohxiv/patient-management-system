# Projeto Patient Management System

## Descrição do Projeto

O Patient Management System é uma aplicação de gestão de pacientes que permite aos pacientes registrarem-se, agendarem e gerenciarem suas consultas com médicos, apresentando ferramentas administrativas para agendamento, confirmação e cancelamento de consultas, além de notificações por SMS e email, tudo construído utilizando Next.js.

## Principais Funcionalidades

- **Registro como Paciente:** Usuários podem se inscrever e criar um perfil pessoal como paciente.

- **Agendamento de Consultas com Médicos:** Pacientes podem agendar consultas com médicos conforme sua conveniência e podem marcar várias consultas.

- **Gerenciamento de Consultas pelo Admin:** Administradores podem visualizar e gerenciar todas as consultas agendadas de forma eficiente.

- **Confirmação/Agendamento de Consultas pelo Admin:** Administradores podem confirmar e definir horários de consultas para garantir que estejam devidamente agendadas.

- **Cancelamento de Consultas pelo Admin:** Administradores têm a capacidade de cancelar qualquer consulta conforme necessário.

- **Envio de SMS e email na Confirmação de Consultas:** Pacientes recebem notificações por SMS e email para confirmar os detalhes de sua consulta.

- **Responsividade Completa:** A aplicação funciona perfeitamente em todos os tipos de dispositivos e tamanhos de tela.

- **Upload de Arquivos Usando Appwrite Storage:** Usuários podem fazer upload e armazenar arquivos de forma segura dentro da aplicação utilizando os serviços de armazenamento do Appwrite.

## Dependências

O projeto utiliza diversas dependências para garantir seu funcionamento suave:

- `@hookform/resolvers`: ^3.9.0,
- `@radix-ui/react-checkbox`: ^1.1.1,
- `@radix-ui/react-dialog`: ^1.1.1,
- `@radix-ui/react-dropdown-menu`: ^2.1.1,
- `@radix-ui/react-label`: ^2.1.0,
- `@radix-ui/react-radio-group`: ^1.2.0,
- `@radix-ui/react-select`: ^2.1.1,
- `@radix-ui/react-slot`: ^1.1.0,
- `@tanstack/react-table`: ^8.19.3,
- `class-variance-authority`: ^0.7.0,
- `clsx`: ^2.1.1,
- `input-otp`: ^1.2.4,
- `lucide-react`: ^0.407.0,
- `next`: 14.2.4,
- `next-themes`: ^0.3.0,
- `node-appwrite`: ^13.0.0,
- `react`: ^18,
- `react-datepicker`: ^7.3.0,
- `react-dom`: ^18,
- `react-dropzone`: ^14.2.3,
- `react-hook-form`: ^7.52.1,
- `react-phone-number-input`: ^3.4.3,
- `resend`: ^3.4.0,
- `tailwind-merge`: ^2.4.0,
- `tailwindcss-animate`: ^1.0.7,
- `zod`: ^3.23.8,
- `@types/node`: ^20,
- `@types/react`: ^18,
- `@types/react-dom`: ^18,
- `eslint`: ^8,
- `eslint-config-next`: 14.2.4,
- `postcss`: ^8,
- `tailwindcss`: ^3.4.1,
- `typescript`: ^5

## Como Executar o Projeto

1. Clone este repositório em sua máquina local.
2. Certifique-se de ter o Node.js e o npm (ou yarn) instalados.
3. Instale as dependências do projeto utilizando o seguinte comando:

```bash
npm install
# ou
yarn install
```

4. Crie um arquivo `.env` na raiz do projeto com as seguintes chaves e seus respectivos valores:

```env
PROJECT_ID=seu_valor_aqui
API_KEY=seu_valor_aqui
DATABASE_ID=seu_valor_aqui
PATIENT_COLLECTION_ID=seu_valor_aqui
DOCTOR_COLLECTION_ID=seu_valor_aqui
APPOINTMENT_COLLECTION_ID=seu_valor_aqui
NEXT_PUBLIC_BUCKET_ID=seu_valor_aqui
NEXT_PUBLIC_ENDPOINT=seu_valor_aqui
NEXT_PUBLIC_ADMIN_PASSKEY=seu_valor_aqui
RESEND_API_KEY=seu_valor_aqui
```

Certifique-se de substituir `seu_valor_aqui` pelos valores corretos de cada chave.

5. Inicie o servidor de desenvolvimento com o seguinte comando:

```bash
npm run dev
# ou
yarn dev
```

6. Acesse a aplicação em `http://localhost:3000` e explore as funcionalidades completas do Patient Management System e adapte-as conforme suas necessidades específicas.
