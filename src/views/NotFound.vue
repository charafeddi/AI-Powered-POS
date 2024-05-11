<template>
    <div class="row">
        <div class="col d-flex align-content-stretch flex-wrap">
            <div class="error-page-image"></div>
            <div class="error-page-text">
                <h3>Oops.. Something went wrong</h3>
                <p>It seems that the page you are looking for does not exists.<br>Go back to the Homepage page.</p>
                <div class="error-page-actions">
                    <router-link :to="{name:'DashBoard'}" class="btn btn-primary">Homepage</router-link>
                </div>
            </div>
        </div>
    </div>
</template>
