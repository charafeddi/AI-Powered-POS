<template>
    <div class="mailbox-compose show" v-if="condition">
        <div class="mailbox-compose-content" ref="">
            <div class="mailbox-compose-header">
                <h5>Compose Message</h5>
            </div>
            <div class="mailbox-compose-body">
                <form>
                    <div class="form-group">
                        <input type="email" class="form-control" id="compose-email" placeholder="To">
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Subject">
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Cc">
                    </div>
                    <div class="form-group">
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="7"></textarea>
                    </div>
                    <div class="compose-options">
                        <a href="#"><i class="material-icons">text_format</i></a>
                        <a href="#"><i class="material-icons">attach_file</i></a>
                        <a href="#"><i class="material-icons">insert_link</i></a>
                        <a href="#"><i class="material-icons">insert_emoticon</i></a>
                        <a href="#"><i class="material-icons-outlined">insert_photo</i></a>
                        <a href="#"><i class="material-icons">delete_outline</i></a>
                    </div>
                    <div class="compose-buttons" style="height: 310 px;">
                        <a href="#" class="btn btn-block btn-success">Send</a>
                        &nbsp;
                        <a href="#" @click.prevent="cancelCompose" class="btn btn-block btn-danger">Cancel</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import {useStore} from 'vuex';
import { computed, onMounted, onUnmounted, ref} from 'vue'
export default {
    name:'ComposeMail',
    setup() {
        const store = useStore();
        const condition = computed(() => store.getters['mail/getComposeMail']);
        const composeContent = ref(null);

        const handleClickOutside = (event) => {
            if (composeContent.value && !composeContent.value.contains(event.target)) {
                cancelCompose();
            }
        };

        onMounted(() => {
            document.addEventListener('click', handleClickOutside);
        });

        onUnmounted(() => {
            document.removeEventListener('click', handleClickOutside);
        });

        const cancelCompose = () =>{
            store.dispatch('mail/ComposeMail', false);
        };

        return {
            condition,
            cancelCompose,
            composeContent,
        };
    }
}
</script>