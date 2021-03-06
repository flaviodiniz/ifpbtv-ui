
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
  label?: string;
  value?: string;
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
  label?: string;
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

export class Marca{
  label?: string;
  value?: string;
}

export class TipoMidia{
  label?: string;
  value?: string;
}

export class Disponibilidade{
  label?: string;
  value?: string;
}

export class Programacao{
  id?: number;	
	titulo?: string;
	tipoProgramacao?: string;
	horarioInicio?: string;
	horarioFim?: string;
	diaSemana?: string;
  dataCriacao?: Date;
  usuario?: number;
  dataExibicao?: number;
  playlist = new Array<Midia>();
}

export class TipoProgramacao{
  label?: string;
  value?: string;
}

export class GradeDeProgramacao{
  id?: number;	
	titulo?: string;
	exibindo?: boolean;
	ativa?: boolean;
  programacoes = new Array<Programacao>();
}
