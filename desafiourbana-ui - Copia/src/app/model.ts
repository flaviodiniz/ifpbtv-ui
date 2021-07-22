export class Usuario {
    id: number;
    nome: string;
    email: string;
    senha: string;
}

export class Cartao {
    id: number;
    nome: string;
    numeroCartao: number;
    status: boolean;
    tipoCartao: string;
    usuario = new Usuario();
}
