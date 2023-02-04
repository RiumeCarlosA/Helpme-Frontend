import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Chamado } from 'src/app/models/chamado';
import { ChamadoService } from 'src/app/services/chamado.service';

@Component({
  selector: 'app-chamado-list',
  templateUrl: './chamado-list.component.html',
  styleUrls: ['./chamado-list.component.css']
})
export class ChamadoListComponent {

  ELEMENT_DATA: Chamado[] = []

  FILTERED_DATA: Chamado[] = []

  displayedColumns: string[] = ['id', 'titulo', 'cliente', 'tecnico', 'dataAbertura', 'prioridade', 'status', 'acoes'];
  dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);

  prioridade: any = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: ChamadoService
  ) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  retornaStatus(status: any): string {
    if(status == '0') {
      return 'ABERTO'
    } else if(status == '1') {
      return 'EM ANDAMENTO'
    } else {
      return 'ENCERRADO'
    }
  }

  retornaPrioridade(prioridade: any): string {
    if(prioridade == '0') {
      return 'BAIXA'
    } else if(prioridade == '1') {
      return 'MÉDIA'
    } else {
      return 'ALTA'
    }
  }

  orderByStatus(event: any, status: any): void {
    let targetButton = event.target.parentNode;
    let list: Chamado[] = []
    if(this.prioridade != status) {
      this.prioridade = status;
      this.ELEMENT_DATA.forEach(element => {
        if(element.status == status)
          list.push(element)
      });
      this.FILTERED_DATA = list;
      this.dataSource = new MatTableDataSource<Chamado>(list);
      this.dataSource.paginator = this.paginator;
    } else {
      this.prioridade = null;
      this.findAll();
      targetButton.classList.remove('mat-radio-checked');
      targetButton.classList.add('marked-unchecked');
    }
  } 

  orderByPrioridade(event: any, prioridade: any): void {
    let targetButton = event.target.parentNode;
    let list: Chamado[] = []
    if(this.prioridade != prioridade) {
      this.prioridade = prioridade;
      this.ELEMENT_DATA.forEach(element => {
        if(element.status == prioridade)
          list.push(element)
      });
      this.FILTERED_DATA = list;
      this.dataSource = new MatTableDataSource<Chamado>(list);
      this.dataSource.paginator = this.paginator;
    } else {
      this.prioridade = null;
      this.findAll();
      targetButton.classList.remove('mat-radio-checked');
      targetButton.classList.add('marked-unchecked');
    }
  } 

}
