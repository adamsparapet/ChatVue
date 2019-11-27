import Vue  from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const now = new Date();

const store = new Vuex.Store({
    state: {
        // Текущий пользователь
        user: {
            name: 'Адам',
            img: 'dist/images/11.jpg'
        },
        // Список диалогов
        sessions: [
            {
                id: 1,
                user: {
                    name: 'Дима',
                    img: 'dist/images/2.png'
                },
                messages: [
                    {
                        content: 'Привет Адам как твои дела?',
                        date: new Date()
                    }, 
                    {
                        content: 'Ты чего не отвечаешь?',
                        date: new Date()
                    },
                    {
                        content: 'Чем сегодня занимался?',
                        date: new Date()
                    }
                ]
            },
            {
                id: 2,
                user: {
                    name: 'Петр',
                    img: 'dist/images/3.jpg'
                },
                messages: [
                    {
                        content: 'Здорова',
                        date: new Date()
                    }
                ]
            },
            {
                id: 3,
                user: {
                    name: 'Сергей',
                    img: 'dist/images/3.jpg'
                },
                messages: [
                    {
                        content: 'Привет Адам, рад тебя видеть!',
                        date: new Date()
                    }
                ]
            }
        ],
        // Выбранный диалог
        currentSessionId: 1,
        // Показывать даилоги, которые содержат эту строку
        filterKey: ''
    },
    mutations: {
        INIT_DATA (state) {
            let data = localStorage.getItem('vue-chat-session');
            if (data) {
                state.sessions = JSON.parse(data);
            }
        },
        // Отправить сообщение
        SEND_MESSAGE ({ sessions, currentSessionId }, content) {
            let session = sessions.find(item => item.id === currentSessionId);
            session.messages.push({
                content: content,
                date: new Date(),
                self: true
            });
        },
        // Выбрать диалог
        SELECT_SESSION (state, id) {
            state.currentSessionId = id;
        } ,
        // Поиск диалога по фильтру
        SET_FILTER_KEY (state, value) {
            state.filterKey = value;
        }
    }
});

store.watch(
    (state) => state.sessions,
    (val) => {
        console.log('CHANGE: ', val);
        localStorage.setItem('vue-chat-session', JSON.stringify(val));
    },
    {
        deep: true
    }
);

export default store;
export const actions = {
    initData:      ({ dispatch })          => dispatch('INIT_DATA'),             // Инициализация данных
    sendMessage:   ({ dispatch }, content) => dispatch('SEND_MESSAGE', content), // Отправка сообщения
    selectSession: ({ dispatch }, id)      => dispatch('SELECT_SESSION', id),    // Выбор диалога
    search:        ({ dispatch }, value)   => dispatch('SET_FILTER_KEY', value)  // Поиск диалога по логину
};
