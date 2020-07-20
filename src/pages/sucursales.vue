<template>
  <q-page>

    <h5 class="q-my-xs q-pt-sm q-ml-md">Sucursales</h5>
        <div v-for="item in sucursalEmpleado" :key="item">
    <div class="row q-col-gutter-sm q-ma-xs q-mr-sm">
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-card flat bordered class="">
          <q-card-section class="row">
            <div class="text-h6 col-12">{{item.tblSucursale.nombreSucursal}}
            </div>
          </q-card-section>

          <q-separator inset></q-separator>

          <q-card-section>
            <q-table
              :data="sucursalEmpleado"
              :columns="columns"
              row-key="name"
              :pagination.sync="pagination"
            >
              <template v-slot:body-cell-action="props">
                <q-td :props="props">
                  <div class="q-gutter-sm">
                    <q-btn dense color="primary" icon="edit"/>
                    <q-btn dense color="red" icon="delete"/>
                  </div>
                </q-td>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </div>
      <!--
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-card flat bordered class="">
          <q-card-section class="row">
            <div class="text-h6 col-12">Finance
            </div>
          </q-card-section>

          <q-separator inset></q-separator>

          <q-card-section>
            <q-table
              :data="finance_data"
              :columns="columns"
              row-key="name"
              :pagination.sync="pagination"
            >
              <template v-slot:body-cell-action="props">
                <q-td :props="props">
                  <div class="q-gutter-sm">
                    <q-btn dense color="primary" icon="edit"/>
                    <q-btn dense color="red" icon="delete"/>
                  </div>
                </q-td>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-card flat bordered class="">
          <q-card-section class="row">
            <div class="text-h6 col-12">Human Resources
            </div>
          </q-card-section>

          <q-separator inset></q-separator>

          <q-card-section>
            <q-table
              :data="hr_data"
              :columns="columns"
              row-key="name"
              :pagination.sync="pagination"
            >
              <template v-slot:body-cell-action="props">
                <q-td :props="props">
                  <div class="q-gutter-sm">
                    <q-btn dense color="primary" icon="edit"/>
                    <q-btn dense color="red" icon="delete"/>
                  </div>
                </q-td>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-card flat bordered class="">
          <q-card-section class="row">
            <div class="text-h6 col-12">Information Technology
            </div>
          </q-card-section>

          <q-separator inset></q-separator>

          <q-card-section>
            <q-table
              :data="it_data"
              :columns="columns"
              row-key="name"
              :pagination.sync="pagination"
            >
              <template v-slot:body-cell-action="props">
                <q-td :props="props">
                  <div class="q-gutter-sm">
                    <q-btn dense color="primary" icon="edit"/>
                    <q-btn dense color="red" icon="delete"/>
                  </div>
                </q-td>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </div>
      -->
    </div>
    </div>
  </q-page>
</template>

<script>
import SucursalService from '../service/SucursalService'
import EmpleadoService from '../service/EmpleadoService'
    export default {
        data() {
            return {
                sucursalEmpleado:[],
                columns: [
                    {
                        name: "idSucursal",
                        align: "left",
                        label: "Codigo",
                        field: "idSucursal",
                        sortable: true
                    },
                    {
                        name: "nombre",
                        align: "left",
                        label: "nombre",
                        field: "nombre",
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
                        name: "ubicacion",
                        align: "left",
                        label: "ubicacion",
                        field: "ubicacion",
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
                finance_data: [
                    {
                        serial_no: "01",
                        designation: "Admin",
                    },
                    {
                        serial_no: "02",
                        designation: "Staff",
                    },
                    {
                        serial_no: "03",
                        designation: "Admin",
                    }
                ],
                account_data: [
                    {
                        serial_no: "01",
                        designation: "Senior Account",
                    },
                    {
                        serial_no: "02",
                        designation: "Manager Account",
                    },
                    {
                        serial_no: "03",
                        designation: "Manager",
                    }
                ],
                hr_data: [
                    {
                        serial_no: "01",
                        designation: "Manager",
                    },
                    {
                        serial_no: "02",
                        designation: "Department Head",
                    },
                    {
                        serial_no: "03",
                        designation: "assistant",
                    }
                ],
                it_data: [
                    {
                        serial_no: "01",
                        designation: "Software developer",
                    },
                    {
                        serial_no: "02",
                        designation: "Grapics designer",
                    },
                    {
                        serial_no: "03",
                        designation: "Tester",
                    }
                ],
                pagination: {
                    rowsPerPage: 5
                }
            }
        },
        created() {
          this.empleadoService=new EmpleadoService();
          this.sucursalService=new SucursalService();
        },
        mounted() {
          this.getAll()
        },
        methods: {
          getAll(){
            this.empleadoService.getAll().then(data=>{
              data.data.forEach(e => {
                this.sucursalEmpleado.push({
                  nombreEmpleado:e.nombres,
                  apellidoEmpleado:e.apellidos,
                  cargo:e.tblCar.car,
                  tipoEmpleo:e.tblEmpleo.tipoEmpleo,
                  tblSucursale:{
                    idSucursal:e.tblSucursale.idSucursal,
                    nombreSucursal:e.tblSucursale.nombre,
                    telefonoSucursal:e.tblSucursale.telefono,
                    ubicacion:e.tblSucursale.ubicacion
                  }

                });
              });
              console.log(this.sucursalEmpleado)
            })
          }
        },
    }
</script>
