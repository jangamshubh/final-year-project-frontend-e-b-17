<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <Toast />
                <div class="card-header flex justify-content-between flex-column sm:flex-row">
                    <h5>Create Committee</h5>
                    <Button type="button" icon="pi pi-arrow-left" label="Back To Index Page" class="p-button-outlined mb-2" @click="redirectToIndexPage()" />
                </div>
                <div class="field p-fluid">
                    <label for="name1">Name</label>
                    <InputText id="name1" type="text" v-model="v$.committee.name.$model"/>
                </div>
                <div class="field p-fluid">
                    <label for="description1">Description</label>
                    <InputText id="description1" type="text" v-model="v$.committee.description.$model"/>
                </div>
                <div class="field p-fluid">
                    <h5>Select Admin</h5>
                    <Dropdown v-model="v$.committee.admin_id.$model" :options="admins" optionLabel="name" optionValue="id" placeholder="Select Admin for Committee"/>
                </div>
                <Button label="Submit" v-on:click="saveCommittee()" :disabled="v$.committee.$invalid"></Button>
            </div>
        </div>
    </div>
</template>

<script>
import { required, integer, maxLength } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import axios from 'axios';
import authHeader from '../../services/auth-header';
export default {
    name:"Login",
    data() {
        return {
            committee: {
                name: '',
                description: '',
                admin_id: '',
            },
            admins: [],
        };
    },
    setup: () => ({ v$: useVuelidate() }),
    validations () {
        return {
          committee: {
            name: { required },
            description: { max: maxLength(1000) },
            admin_id : { integer },
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
         this.getCommitteeAdmins();
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
            setTimeout(() => this.$router.push({ name: 'committees.index' }), 3000)
        },
        getCommitteeAdmins() {
            axios.get(`${process.env.VUE_APP_API_URL}/users/getAllCommitteeAdmins`, { headers: authHeader() }).then(data => {
                let response = data.data;
                this.admins = response.data;
            })
        },
        saveCommittee() {
            axios.post(`${process.env.VUE_APP_API_URL}/committees/store`,this.committee,{ headers: authHeader() }).then(data => {
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
            this.$router.push({ name: 'committees.index' });
        },

    },
}
</script>
