<template>
  <q-page class="q-pa-sm">
    <q-table
      title="Productos"
      :data="products"
      :hide-header="mode === 'grid'"
      :columns="columns"
      row-key="name"
      :grid="mode=='grid'"
      :filter="filter"
      :pagination.sync="pagination"
    >
     <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <div class="q-gutter-sm">
           
            <q-btn @click="edit(props.row.idProducto)" dense color="primary" icon="edit" key="1" />
            
            <q-btn @click="deleteProduct(props.row.idProducto)" dense color="red" icon="delete" />
            
          </div>
        </q-td>
      </template>
      <template v-slot:top-right="props">
        <q-btn @click="new_customer=true" outline color="primary" label="Nuevo Producto" class="q-mr-xs" />

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
          label="Exportar a csv"
          no-caps
          @click="exportTable"
        />
      </template>

      

    </q-table>
    <q-dialog v-model="new_customer">
      <q-card style="width: 600px; max-width: 60vw;">
        <q-card-section>
          <div class="text-h6">
            Agregar Nuevo Producto
            <q-btn round flat dense icon="close" class="float-right" color="grey-8" v-close-popup></q-btn>
          </div>
        </q-card-section>
        <q-separator inset></q-separator>
        <q-card-section class="q-pt-none">
          <q-form class="q-gutter-md" action="" method="post">
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Descripcion Producto</q-item-label>
                  <q-input dense outlined v-model="producto.descripcion" label="descripcion" />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Nombre Producto</q-item-label>
                  <q-input dense outlined v-model="producto.nombre" label="Nombre" />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Precio</q-item-label>
                  <q-input dense outlined v-model="producto.precio" label="precio" />
                </q-item-section>
              </q-item>

              
                  
                  <template>
                     <div class="q-pa-md" style="max-width: 300px">
                      <div class="q-gutter-md">
                        <q-item-label class="q-pb-xs">Categoria</q-item-label>
                        <q-select square outlined v-model="producto.idCategoria" key="" :options="options" label="Square outlined" />
                        </div>
  </div>
</template>
             
             <!--  <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Last Call</q-item-label>
                  <q-input
                    dense
                    outlined
                    v-model="customer.last_call"
                    mask="date"
                    label="Last Call"
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          ref="lastCallProxy"
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date
                            v-model="customer.last_call"
                            @input="() => $refs.lastCallProxy.hide()"
                          />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </q-item-section>
              </q-item> -->
            </q-list>
              <q-card-actions align="right" class="bg-white text-teal">
          <q-btn  @click="postProduct()"  label="Save" type="submit" color="primary" v-close-popup />
        </q-card-actions>
          </q-form>
        </q-card-section>

      
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { exportFile } from "quasar";
import ProductService from "../service/ProductService";
import CategoriaService from "../service/CategoriaService";
import axios from 'axios'
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
      producto:{
        idProducto:null,
        descripcion:null,
        nombre:null,
        precio:null,
        idCategoria:null
      },
      model: null,
      options: [
        {
          label:null,
          value:null
        }
      ],
      products: [],
      filter: "",
      customer: {},
      new_customer: false,
      mode: "list",
      columns: [
        /*{
          name: "idProducto",
          required: true,
          label: "idProducto",
          align: "left",
          field: "idProducto",
          sortable: true
        },*/
          {
          name: "nombre",
          align: "left",
          label: "Nombre",
          field: "nombre",
          sortable: true
        },
        {
          name: "descripcion",
          align: "left",
          label: "Descripcion",
          field: "descripcion",
          sortable: true
        },
      
        {
          name: "precio",
          align: "left",
          label: "Precio",
          field: "precio",
          sortable: true
        },
        {
          name: "tblCategoria.cateria",
          align: "left",
          label: "Categoria",
          field: "categoria",
          sortable: true
        },
        {
          name: "action",
          align: "left",
          label: "Accion",
          field: "action",
          sortable: true
        }
      ],
      data: [
        {
          name: "Dr. Jada Conolly",
          city: "GILBERT",
          state: "AZ",
          last_call: "12-09-2019"
        }
      ],
      pagination: {
        rowsPerPage: 10
      }
    };
  },
  created() {
    this.productService = new ProductService();
    this.categoriaService = new CategoriaService();
  },
  mounted() {
    this.getAll();
    this.getAllCategorias();
  },
  computed: {
    obtener(){
      return this.getAll();
    }
  },
  methods: {
    exportTable() {
      // naive encoding to csv format
      const content = [this.columns.map(col => wrapCsvValue(col.label))]
        .concat(
          this.data.map(row =>
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

      const status = exportFile("customer-management.csv", content, "text/csv");

      if (status !== true) {
        this.$q.notify({
          message: "Browser denied file download...",
          color: "negative",
          icon: "warning"
        });
      }
    },
    getAll() {
      this.productService.getAll().then(data => {
        data.data.forEach(e => {
          this.products.push({
            idProducto: e.idProducto,
            descripcion: e.descripcion,
            nombre: e.nombre,
            precio: e.precio,
            categoria: e.tblCategoria.cateria
          });
        });
      });
    },
    getAllCategorias() {
      this.categoriaService.getAll().then(data => {
        data.data.forEach(e => {
          this.options.push({
            value:e.idCategoria,
            label:e.cateria
          });
        
        });
      });
    },
    postProduct() {
      const codigo= this.products[this.products.length-1].idProducto
       console.log(this.producto.idCategoria)
      axios
        .post("http://localhost:8090/rest/products", {
          idProducto:codigo+1,
          descripcion: this.producto.descripcion,
          nombre: this.producto.nombre,
          precio: this.producto.precio,
          tblCategoria: {
            idCategoria: this.producto.idCategoria.value
          }
        }
        )
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
        this.products=[];
        
        this.producto={};
        this.getAll();
    },
    deleteProduct(id){
      axios.delete(`http://localhost:8090/rest/products/${id}`).then(response=>{
        console.log(response)
      })
      this.products=[];
      this.getAll();
    }
  }
};
</script>
