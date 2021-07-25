
export class Usuario{
  id?: number;
  nome?: string;
  email?: string;
  senha?: string;
  matricula?: string;
  status?: string;
  perfil?: string;
}

export class TV{
  id?: number;
  local?: string;
  modelo?: string;
  marca?: string;
  chave?: string;
  disponivel?: string;
  online?: boolean;
}

export class Midia{
  id?: number;
  titulo?: string;
  chaveEspecifica?: string;
  link?: string;
  dataCriacao?: string;
  duracao?: number;
  online?: boolean;
  tipoMidia?: string;
  disponibilidadeMidia?: string;
  usuario?: Usuario;
  chaves = new Array<Chave>();
}

export class Chave{
  id?: number;
  chave?: string;
}

export class Token{
  access_token?: string;
}

export class Login{
  usuario?: string;
  senha?: string;
}

export class Perfil{
  label?: string;
  value?: string;
}
