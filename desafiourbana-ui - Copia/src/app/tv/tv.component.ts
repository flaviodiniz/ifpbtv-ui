import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { Marca, TV } from '../models/model';
import { TvService } from '../services/tv.service';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.css']
})
export class TvComponent implements OnInit {

  marcas = [];
  tv = new TV();

  constructor(
    private toasty: ToastyService,
    private route: ActivatedRoute, 
    private router: Router,  
    private tvService: TvService,
  ) { }

  ngOnInit(): void {
    this.getPerfis();

    const idTv = this.route.snapshot.params['id'];

    if (idTv) {
      this.buscarTv(idTv);
    }
  }

  buscarTv(codigo: number) {
    this.tvService.buscarPorCodigo(codigo)
    .then(dados => {
      this.tv = dados;
    })
    .catch(erro =>{
      console.log(erro);
    });
  }

  getPerfis() {
    this.tvService.getMarcas().then(dados => {
      dados.forEach(element => {
        let per = new Marca;
        per.label = element;
        per.value = element;
        this.marcas.push(per);
      });
    });
  }

  get editandoTv() {
    return Boolean(this.tv.id)
  }

  salvar(form: Form) {
    if (this.editandoTv) {
      this.atualizarTv(form);
    } else {
      this.cadastrarTv(form);
    }
  }

  async cadastrarTv(form: Form) {
    await this.tvService.SalvarTv(this.tv)
      .then(tvCadastrado => {
        if (tvCadastrado.status == 400) {
          this.toasty.error(tvCadastrado.error.mensagem);
        } else {
          this.toasty.success('TV salva com sucesso!');
          this.router.navigate(['tvs']);
        }
      });
  }

  atualizarTv(form: Form) {
    this.tvService.atualizarTv(this.tv)
      .then(tv => {
        this.tv = tv;
        this.tv = new TV();
        this.toasty.success('TV editada com sucesso!');
        this.router.navigate(['tvs']);          
      })
      .catch(erro =>{
        console.log(erro);
      });
  }

}
