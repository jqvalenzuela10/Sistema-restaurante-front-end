<template>
  <q-page class="q-pa-sm">
    <q-table
      title="Empleados"
      :data="empleados"
      :hide-header="mode === 'grid'"
      :columns="columns"
      row-key="name"  
      :grid="mode=='grid'"
      :filter="filter"
      :pagination.sync="pagination"
    >
  
      <template v-slot:top-right="props">
        <q-btn @click="new_user=true" outline color="primary" label="Add New" class="q-mr-xs" />
        <q-input outlined dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-btn
          flat
          round
          dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
          v-if="mode === 'list'"
        >
          <q-tooltip
            :disable="$q.platform.is.mobile"
            v-close-popup
          >{{props.inFullscreen ? 'Exit Fullscreen' : 'Toggle Fullscreen'}}</q-tooltip>
        </q-btn>

        <q-btn
          flat
          round
          dense
          :icon="mode === 'grid' ? 'list' : 'grid_on'"
          @click="mode = mode === 'grid' ? 'list' : 'grid'; separator = mode === 'grid' ? 'none' : 'horizontal'"
          v-if="!props.inFullscreen"
        >
          <q-tooltip
            :disable="$q.platform.is.mobile"
            v-close-popup
          >{{mode==='grid' ? 'List' : 'Grid'}}</q-tooltip>
        </q-btn>

        <q-btn
          color="primary"
          icon-right="archive"
          label="Export to csv"
          no-caps
          @click="exportTable"
        />
      </template>
      <!--edi y el delete-->
      <template v-slot:body-cell-detail="props">
        <q-td :props="props">
          
          <q-btn @click="details(props.row.idEmpleado)" key="{{props.row.idEmpleado}}" dense round color="secondary" icon="pageview" />
         <!-- <h1>{{ props.row.name }}</h1>-->
        </q-td>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <div class="q-gutter-sm">
            <q-btn @click="edit(props.row.idEmpleado)" dense color="primary" icon="edit" key="1" />
            <q-btn @click="deleteUser(props.row.idEmpleado)" dense color="red" icon="delete" />
            
          </div>
        </q-td>
      </template>
   </q-table>
    <!--modal para ver el detalle de un empleado-->
    
     <q-dialog  v-model="employee_dialog">
      <q-card  class="my-card" flat bordered >
          <q-card-section>
            <div class="text-h6">
               
              <q-btn round flat dense icon="close" class="float-right" color="grey-8" v-close-popup></q-btn>
            </div>
          </q-card-section>
          <q-card-section horizontal>
            <q-card-section class="q-pt-xs">
              <div class="text-overline">{{ this.empleado.cargo}}</div>
              <div class="text-h5 q-mt-sm q-mb-xs">{{ this.empleado.nombre}}</div>
              <div style="font-size:15px;margin-top:10px;" class="text-caption  text-grey ">  Tipo de empleo :  {{ this.empleado.tipoEmpleo}}  </div>
                <div style="font-size:15px;;margin-top:10px;" class="text-caption text-grey "> Sucursal      :  {{ this.empleado.sucursal}}      </div>
                <div style="font-size:15px;;margin-top:10px;" class="text-caption text-grey ">  Correo       :  {{ this.empleado.correo}}  </div>
               
               
             
            </q-card-section>

            <q-card-section class="col-6 flex flex-end">
              <q-img
                class="rounded-borders"
                src="https://cdn.quasar.dev/img/boy-avatar.png"
              />
            </q-card-section>
          </q-card-section>

          <q-separator/>

          <q-card-section>
            Assessing clients needs and present suitable promoted products. Liaising with and persuading targeted doctors to prescribe our products utilizing effective sales skills.
          </q-card-section>
        </q-card>
    </q-dialog>
   
  



<!--modal para registrar un empleado-->

 <q-dialog v-model="new_user">
      <q-card style="width: 600px; max-width: 60vw;">
        <q-card-section>
          <div class="text-h6">
            Agregar Nuevo Empleado
            <q-btn round flat dense icon="close" class="float-right" color="grey-8" v-close-popup></q-btn>
          </div>
        </q-card-section>
        <q-separator inset></q-separator>
        <q-card-section class="q-pt-none">
          <q-form class="q-gutter-md" action="" method="post">
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Nombre</q-item-label>
                  <q-input dense outlined v-model="empleadoNuevo.nombre" label="nombre" />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Apellido</q-item-label>
                  <q-input dense outlined v-model="empleadoNuevo.apellido" label="apellido" />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Salario</q-item-label>
                  <q-input dense outlined v-model="empleadoNuevo.salario" label="salario" />
                </q-item-section>
              </q-item>

              
                  
               
             
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Nacimiento</q-item-label>
                  <q-input
                    dense
                    outlined
                    v-model="empleadoNuevo.nacimiento"
                    mask="date"
                    label="nacimiento"
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          ref="lastCallProxy"
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date
                            v-model="empleadoNuevo.nacimiento"
                            @input="() => $refs.lastCallProxy.hide()"
                          />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </q-item-section>
              </q-item> 


                <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Telefono</q-item-label>
                  <q-input dense outlined v-model="empleadoNuevo.telefono" label="telefono" />
                </q-item-section>
              </q-item>


                <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Correo</q-item-label>
                  <q-input dense outlined v-model="empleadoNuevo.correo" label="correo" />
                </q-item-section>
              </q-item>

                  <template>
                     <div class="q-pa-md" style="max-width: 300px">
                      <div class="q-gutter-md">
                        <q-item-label class="q-pb-xs">Sucursal</q-item-label>
                        <q-select square outlined v-model="empleadoNuevo.sucursal" :options="sucursal" label="sucursal" />
                        </div>
                      </div>
                  </template>



                  <template>
                     <div class="q-pa-md" style="max-width: 300px">
                      <div class="q-gutter-md">
                        <q-item-label class="q-pb-xs">Tipo Empleado</q-item-label>
                        <q-select square outlined v-model="empleadoNuevo.tipoEmpleo" :options="tipoEmpleado" label="tipo empleado" />
                        </div>
                      </div>
                  </template>


                    <template>
                     <div class="q-pa-md" style="max-width: 300px">
                      <div class="q-gutter-md">
                        <q-item-label class="q-pb-xs">Cargo</q-item-label>
                        <q-select square outlined v-model="empleadoNuevo.cargo" :options="cargo" label="cargo" />
                        </div>
                      </div>
                  </template>


                <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Clave</q-item-label>
                  <q-input dense outlined v-model="empleadoNuevo.clave" label="clave" />
                </q-item-section>
              </q-item>




                

            </q-list>
              <q-card-actions align="right" class="bg-white text-teal">
          <q-btn  @click="registrar()"  label="Save" type="submit" color="primary" v-close-popup />
        </q-card-actions>
          </q-form>
        </q-card-section>

      
      </q-card>
    </q-dialog>





  </q-page>
</template>

<script>
import { exportFile } from "quasar";
import EmpleadoService from "../service/EmpleadoService";
import SucursalService from "../service/SucursalService";
import TipoEmpleadoService from "../service/TipoEmpleadoService";
import CargoService from "../service/cargoService";

import axios from "axios";
function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val;

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');

  return `"${formatted}"`;
}

export default {
  data() {
    return {
      cargo:[{
        label:null,
        value:null
      }],
      tipoEmpleado:[{
        label:null,
        value:null
      }],
      sucursal:[{
        label:null,
        value:null
      }],
      options:[],
      new_user:false,
      empleados: [],
      filter: "",
      mode: "list",
      invoice: {},
      employee_dialog: false,
      employee_dialog_edit: false,
      empleado: {
        id: null,
        cargo: null,
        tipoEmpleo: null,
        sucursal: null,
        nombre: null,
        correo: null,
        apellido:null,
        salario:null
      },
      empleadoNuevo:{
        id: null,
        nombre: null,
        apellido:null,
        salario:null,
        nacimiento:null,
        telefono:null,
        correo: null,
        sucursal: null,
         tipoEmpleo: null,
        cargo: null,
      clave:null
      },
      columns: [
       /* {
          name: "idEmpleado",
          align: "left",
          label: "idEmpleado",
          field: "idEmpleado",
          sortable: true
        },*/
        {
          name: "nombres",
          align: "left",
          label: "nombre",
          field: "nombres",
          sortable: true
        },
        {
          name: "salario",
          align: "left",
          label: "salario",
          field: "salario",
          sortable: true
        },
        {
          name: "telefono",
          align: "left",
          label: "telefono",
          field: "telefono",
          sortable: true
        },
        {
          name: "detail",
          align: "left",
          label: "Detail",
          field: "detail",
          sortable: true
        },
        {
          name: "action",
          align: "left",
          label: "Action",
          field: "action",
          sortable: true
        }
      ],
      data: [
        {
          serial_no: "1",
          name: "Leslie Tecklenburg",
          basic_salary: "$ 4200",
          salary_type: "Basic",
          overtime: "$ 20"
        }
      ],
      pagination: {
        rowsPerPage: 10
      }
    };
  },
  created() {
    this.empleadoService = new EmpleadoService();
     this.sucursalService = new SucursalService();
      this.tipoEmpleadoService = new TipoEmpleadoService();
      this.cargoService = new CargoService();
  },
  mounted() {
    this.getAll();
    this.getAllSucursal();
    this.getAllTipoEmpleado();
    this.getAllCargo();
  },
  methods: {
    exportTable() {
      // naive encoding to csv format

      const content = [this.columns.map(col => wrapCsvValue(col.label))]
        .concat(
          this.empleados.map(row =>
            this.columns
              .map(col =>
                wrapCsvValue(
                  typeof col.field === "function"
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                  col.format
                )
              )
              .join(",")
          )
        )
        .join("\r\n");

      const status = exportFile(
        "employee_salary_list.csv",
        content,
        "text/csv"
      );

      if (status !== true) {
        this.$q.notify({
          message: "Browser denied file download...",
          color: "negative",
          icon: "warning"
        });
      }
    },
    getAll() {
      this.empleadoService.getAll().then(data => {
        data.data.forEach(element => {
          this.empleados.push({
            idEmpleado: element.idEmpleado,
            nombres: element.nombres,
            salario: element.salario,
            telefono: element.telefono
          });
        });
      });
    },
    details(id) {
      //``
      this.employee_dialog = true;
      

      this.empleadoService.getById(id).then(response => {
        this.empleado = {
          id: response.data.idEmpleado,
          cargo: response.data.tblCar.car,
          tipoEmpleo: response.data.tblEmpleo.tipoEmpleo,
          sucursal: response.data.tblSucursale.nombre,
          nombre: response.data.nombres,
          correo: response.data.correo
        };
      });
    },
    edit(id) {
      this.employee_dialog_edit = true;

      axios.get(`http://localhost:8090/rest/users/${id}`).then(response => {
        this.empleado = {
          id: response.data.idEmpleado,
          cargo: response.data.tblCar.car,
          tipoEmpleo: response.data.tblEmpleo.tipoEmpleo,
          sucursal: response.data.tblSucursale.nombre,
          nombre: response.data.nombres,
          correo: response.data.correo
        };
      });
    },
    deleteUser(id) {
      
      axios.delete(`http://localhost:8090/rest/users/${id}`).then(e => {
        console.log(e);
      });
      this.empleados = [];
      this.getAll();
    },
    getAllSucursal(){
      this.sucursalService.getAll().then(data=>{
        data.data.forEach(e => {
      
          this.sucursal.push({
            value:e.idSucursal,
            label:e.nombre
          })
        });
      })
    },
    getAllTipoEmpleado(){
      this.tipoEmpleadoService.getAll().then(data=>{
        
        data.data.forEach(e => {
          this.tipoEmpleado.push({
            value:e.idTipoEmpleo,
            label:e.tipoEmpleo
          })
        });
      })
    },
    getAllCargo(){
      this.cargoService.getAll().then(data=>{
        data.data.forEach(e => {
          
          this.cargo.push({
            value:e.idCar,
            label:e.car
          })
        });
      })
    },
    registrar(){
      const codigo= this.empleados[this.empleados.length-1].idEmpleado
      console.log(this.empleadoNuevo.cargo)
      console.log(this.empleadoNuevo.tipoEmpleo)
      console.log(this.empleadoNuevo.sucursal)
      
      axios
        .post("http://localhost:8090/rest/users", {


          idEmpleado:codigo+1,
          aniosExperiencia: 1,
          apellidos: this.empleadoNuevo.apellido,
          correo: this.empleadoNuevo.correo,
          direccion:"direccion por defecto",
          nacimiento: "1989-02-03",
          nombres:this.empleadoNuevo.nombre,
          salario:this.empleadoNuevo.salario,
          telefono:this.empleadoNuevo.telefono,
          clave:this.empleadoNuevo.clave,
          tblCar:{
            idCar:this.empleadoNuevo.cargo.value
          },
          tblEmpleo:{
            idTipoEmpleo:this.empleadoNuevo.tipoEmpleo.value
          },
          tblSucursale:{
            idSucursal:this.empleadoNuevo.sucursal.value
          }
          
        }
        )
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
        this.empleados=[];
        this.getAll();
        this.empleadoNuevo={};
    }
  }
};
</script>
<style>
.q-chip__content {
  display: block;
  text-align: center;
}
</style>
