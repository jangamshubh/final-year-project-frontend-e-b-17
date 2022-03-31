<template>
    <div class="grid panel-demo">
        <div class="col-6">
            <div class="card">
                <h5>{{ currentUser.name }}</h5>
                <h5>This is a test that I am doing to check if the overflow is limited just to continous word or it is breaking even for the words that are discontinuous</h5>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Profile',
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        },
        currentAccessToken() {
            return this.$store.state.auth.access_token;
        },
        currentRole() {
            return this.$store.state.auth.role;
        }
    },
    created() {
        if (!this.currentUser) {
            this.$router.push('/login');
        }
    },
    mounted() {
        console.log(this.currentRole);
    }
};
</script>

<style scoped>

</style>
