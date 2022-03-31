<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <Toast />
                <div class="card-header flex justify-content-between flex-column sm:flex-row">
                    <h5>Edit Event</h5>
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
                    <Datepicker id="start_time1" v-model="v$.event.start_time.$model" timePicker :format="startTimeFormat" />
                </div>
                <div class="field p-fluid">
                    <label for="end_time1">End Time</label>
                    <Datepicker id="end_time1" v-model="v$.event.end_time.$model" timePicker :format="endTimeFormat" />
                </div>
                <Button label="Submit" v-on:click="updateEvent()" :disabled="v$.event.$invalid"></Button>
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
    name:"Login",
    data() {
        return {
            event: {
                name: '',
                description: '',
                date: '',
                no_of_people_expected: '',
                start_time: {
                    hours: '',
                    minutes: '',
                },
                end_time: {
                    hours: '',
                    minutes: '',
                },
                event_location_id: '',
            },
            start_time: {
                hours: '',
                minutes: '',
            },
            end_time: {
                hours: '',
                minutes: '',
            },
            format: 'd-M-Y',
            startTimeFormat: 'HH:mm',
            endTimeFormat: 'HH:mm',
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
                no_of_people_expected: { required, numeric },
                start_time : { required },
                end_time: { required },
                event_location_id: { required },
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
        },
    },
    created() {
        this.checkUserLogin();
        this.checkUserRole();
        this.getEventLocations();
    },
    mounted() {
        this.getEvent();
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
        getEventLocations() {
            axios.get(`${process.env.VUE_APP_API_URL}/event-locations`, { headers: authHeader() }).then(data => {
                let response = data.data;
                if (response.status == 'Success') {
                    this.event_locations = response.data;

                }
            })
        },
        getEvent() {
            axios.get(`${process.env.VUE_APP_API_URL}/events/${this.$route.params.id}/edit`,{ headers: authHeader() }).then(data => {
                let response = data.data;
                if(response.status == 'Success') {
                    this.event = response.data;
                    let start_time_hour = response.data.start_time.split(":");
                    this.start_time.hours = start_time_hour[0];
                    this.start_time.minutes = start_time_hour[1];
                    let end_time_hour = response.data.end_time.split(":");
                    this.end_time.hours = end_time_hour[0];
                    this.end_time.minutes = end_time_hour[1];
                    this.event.start_time = this.start_time;
                    this.event.end_time =  this.end_time;
                    // console.log(this.event);
                } else {
                    this.$router.push({ name: 'events.index' });
                }
            })
        },
        showSuccess() {
            this.$toast.add({ severity:'success', summary: 'Success Message', detail:'Message Detail', life: 3000 });
        },
        redirectAfterSuccess() {
            setTimeout(() => this.$router.push({ name: 'events.index' }), 3000)
        },
        updateEvent() {
            console.log(this.event);
            axios.put(`${process.env.VUE_APP_API_URL}/events/${this.$route.params.id}/update`,this.event,{ headers: authHeader() }).then(data => {
                let response = data.data;
                if(response.status == 'Success') {
                    this.showSuccess();
                    this.redirectAfterSuccess();
                } else {
                    console.log('error');
                }
            })
        },
        redirectToIndexPage() {
            this.$router.push({ name: 'events.index' });
        },

    },
}
</script>
