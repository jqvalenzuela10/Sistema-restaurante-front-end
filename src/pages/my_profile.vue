<template>
  <q-page>
    <div class="row q-col-gutter-sm q-ma-xs">
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-card class="my-card" flat bordered>
          <q-card-section horizontal>
            <q-card-section class="q-pt-xs">
              <div class="text-overline"></div>
              <div class="text-h5 q-mt-sm q-mb-xs">Junior Sanchez</div>
              <div class="text-caption text-grey">
                Tipo de empleo : Medio tiempo
                Sucursal : Rest2
                Correo :
              </div>
            </q-card-section>

            <q-card-section class="col-5 flex flex-center">
              <q-img
                class="rounded-borders"
                src="https://cdn.quasar.dev/img/boy-avatar.png"
              />
            </q-card-section>
          </q-card-section>

          <q-separator/>

          <q-card-section>
           <!-- Assessing clients needs and present suitable promoted products. Liaising with and persuading targeted doctors to prescribe our products utilizing effective sales skills.-->
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-card>
          <q-card-section>
            <q-form
              class="q-gutter-md"
            >
              <q-input
                filled
                v-model="user.nombre"
                label="Nombre"
              />

              <q-input
                filled
                v-model="user.apellido"
                label="Apellido"

              />


              <q-input
                filled
                v-model="user.email"
                label="Email"

              />

              <q-input
                filled
                v-model="user.clave"
                label="Clave"

              />

              <div>
                <q-btn label="Update" type="submit" color="primary"/>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import Login from './login'
    export default {
        data() {
            return {
                user: {
                    nombre: 'Junior',
                    apellido: 'Sanchez',
                    email: '',
                    clave: '1**4'
                },
            }
        },
    }
</script>

<style scoped>

</style>
