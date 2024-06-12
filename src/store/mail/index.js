import axios from "axios";

export default{
    namespaced:'mail',
    state:{
        ComposeMail:false,
        MailItem:false,
    },
    mutations:{
        setComposeMail(state, ComposeMail){
            state.ComposeMail = ComposeMail
        },
        setMailItem(state, MailItem){
            state.MailItem = MailItem
        }
    },
    getters:{
        getComposeMail(state){
            return state.ComposeMail;
        },
        getMailItem(state){
            return state.MailItem;
        }
    },
    actions:{
        ComposeMail({commit}, composemail){
            commit('setComposeMail', composemail);
        },
        MailItem({commit}, mailitem){
            commit('setMailItem', mailitem);
        }
    }
}