<template>
    <div class="row" :style="{
        'background-image': `url(/images/booking-bg.jpeg)`,
        }">
        <div class="col-12">
            <div class="card">
                <Toast />
                <div class="card-header flex justify-content-between flex-column sm:flex-row">
                    <h5>Create Event</h5>
                    <Button type="button" icon="pi pi-arrow-left" label="Back To Index Page" class="p-button-outlined mb-2" @click="redirectToIndexPage()" />
                </div>
                <div class="field p-fluid">
                    <h5>Select Location</h5>
                    <Dropdown v-model="v$.event.event_location_id.$model" :options="event_locations" optionLabel="name" optionValue="id" placeholder="Select Location for Event" />
                </div>
                <div class="field p-fluid">
                    <label for="name1">Name</label>
                    <InputText id="name1" type="text" v-model="v$.event.name.$model"/>
                </div>
                <div class="field p-fluid">
                    <label for="description1">Description</label>
                    <InputText id="description1" type="text" v-model="v$.event.description.$model"/>
                </div>
                <div class="field p-fluid">
                    <label for="no_of_people_expected1">No. Of People Expected?</label>
                    <InputText id="no_of_people_expected1" type="text" v-model="v$.event.no_of_people_expected.$model"/>
                </div>
                <div class="field p-fluid">
                    <label for="date1">Date</label>
                    <Datepicker id="date1" v-model="v$.event.date.$model" :format="format" />
                </div>
                <div class="field p-fluid">
                    <label for="start_time1">Start Time</label>
                    <Datepicker id="start_time1" v-model="v$.event.start_time.$model" timePicker />
                </div>
                <div class="field p-fluid">
                    <label for="end_time1">End Time</label>
                    <Datepicker id="end_time1" v-model="v$.event.end_time.$model" timePicker />
                </div>
                <Button label="Submit" v-on:click="saveEvent()" :disabled="v$.event.$invalid"></Button>
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
            event: {
                name: '',
                description: '',
                date: '',
                no_of_people_expected: '',
                start_time: '',
                end_time: '',
                event_location_id: '',
            },
            format: 'd-M-Y',
            event_locations: [],
        };
    },
    setup: () => ({ v$: useVuelidate() }),
    validations () {
        return {
            event: {
                name: { required },
                description: { max: maxLength(1000) },
                date : { required },
                event_location_id: { required },
                no_of_people_expected: { required, numeric },
                start_time : { required },
                end_time: { required },
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
        this.getEventLocations();
    },
    methods: {
        checkUserLogin() {
            if (!this.loggedIn) {
                this.$router.push("/login");
            }
        },
        checkUserRole() {
            if(this.checkRole != 'Super Admin' && this.checkRole != 'Committee Admin') {
                this.$router.push("/");
            }
        },
        showSuccess() {
            this.$toast.add({ severity:'success', summary: 'Success Message', detail:'Message Detail', life: 3000 });
        },
        getEventLocations() {
            axios.get(`${process.env.VUE_APP_API_URL}/event-locations`, { headers: authHeader() }).then(data => {
                let response = data.data;
                if (response.status == 'Success') {
                    this.event_locations = response.data;

                }
            })
        },
        redirectAfterSuccess() {
            setTimeout(() => this.$router.push({ name: 'events.index' }), 3000)
        },
        saveEvent() {
            console.log(this.event)
            axios.post(`${process.env.VUE_APP_API_URL}/events/store`,this.event,{ headers: authHeader() }).then(data => {
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
            this.$router.push({ name: 'events.index' });
        },

    },
}
</script>
