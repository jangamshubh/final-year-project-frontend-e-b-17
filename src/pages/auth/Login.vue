<template>
    <div class="row">
        <div class="col-12">
            <div class="card p-fluid">
                <h5>Login</h5>
                <div class="field">
                    <label for="email1">Email</label>
                    <InputText id="email1" type="text" v-model="user.email"/>
                </div>
                <div class="field">
                    <label for="password1">Password</label>
                    <InputText id="password1" type="password" v-model="user.password"/>
                </div>
                <Button label="Submit" v-on:click="handleLogin"></Button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name:"Login",
    data() {
        return {
            user: {
                email: '',
                password: '',
            },
        };
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
        checkUser() {
            return this.$store.state.auth.user;
        },
    },
    created() {
        this.checkUserLogin();
    },
    methods: {
        checkUserLogin() {
            if (this.checkUser) {
                this.$router.push("/profile");
            }
        },
        handleLogin() {
            this.$store.dispatch("auth/login", this.user).then(
                () => {
                    this.$router.push("/profile");
                },
                (error) => {
                    this.loading = false;
                    this.message =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                        error.message ||
                        error.toString();
                    }
                );
            },
        },
    }
</script>
