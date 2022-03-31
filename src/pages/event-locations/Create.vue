<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <Toast />
                <div class="card-header flex justify-content-between flex-column sm:flex-row">
                    <h5>Create Event Location</h5>
                    <Button type="button" icon="pi pi-arrow-left" label="Back To Index Page" class="p-button-outlined mb-2" @click="redirectToIndexPage()" />
                </div>
                <div class="field p-fluid">
                    <label for="name1">Name</label>
                    <InputText id="name1" type="text" v-model="v$.event_location.name.$model"/>
                </div>
                <div class="field p-fluid">
                    <label for="description1">Description</label>
                    <InputText id="description1" type="text" v-model="v$.event_location.description.$model"/>
                </div>
                <div class="field p-fluid">
                    <label for="location1">Location</label>
                    <InputText id="location1" type="text" v-model="v$.event_location.location.$model"/>
                </div>
                <div class="field p-fluid">
                    <label for="seating_capacity1">Seating Capacity</label>
                    <InputText id="seating_capacity1" type="text" v-model="v$.event_location.seating_capacity.$model"/>
                </div>
                <Button label="Submit" v-on:click="saveEventLocation()" :disabled="v$.event_location.$invalid"></Button>
            </div>
        </div>
    </div>
</template>

<script>
import { required, numeric, maxLength } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import axios from 'axios';
import authHeader from '../../services/auth-header';
export default {
    name:"Create Event Location",
    data() {
        return {
            event_location: {
                name: '',
                description: '',
                location: '',
                seating_capacity: '',
            },
        };
    },
    setup: () => ({ v$: useVuelidate() }),
    validations () {
        return {
          event_location: {
            name: { required },
            description: { max: maxLength(1000) },
            location : { required },
            seating_capacity: { required, numeric }
          }
        }
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
        checkUser() {
            return this.$store.state.auth.user;
        },
        checkRole() {
            return this.$store.state.auth.role;
        }
    },
    created() {
         this.checkUserLogin();
         this.checkUserRole();
    },
    methods: {
        checkUserLogin() {
            if (!this.loggedIn) {
                this.$router.push("/login");
            }
        },
        checkUserRole() {
            if(this.checkRole != 'Super Admin') {
               this.$router.push("/");
           }
        },
        showSuccess() {
            this.$toast.add({ severity:'success', summary: 'Success Message', detail:'Message Detail', life: 3000 });
        },
        redirectAfterSuccess() {
            setTimeout(() => this.$router.push({ name: 'event-locations.index' }), 3000)
        },
        saveEventLocation() {
            axios.post(`${process.env.VUE_APP_API_URL}/event-locations/store`,this.event_location,{ headers: authHeader() }).then(data => {
                let response = data.data;
                if(response.status == 'Success') {
                    this.showSuccess();
                    this.redirectAfterSuccess();
                } else {
                    console.log(response);
                }
            })
        },
        redirectToIndexPage() {
            this.$router.push({ name: 'event-locations.index' });
        },

    },
}
</script>
