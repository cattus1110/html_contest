Vue.createApp({
    data() {
        return {
            userinfo:{},
            model: {
                account: '',
                password: '',
                role: 0,
                id: 0,
            },
            message: 'Login',
            users: [],
            loginLog: [],
            roleMap: null,
            editState: false,
            menuState: 1,
        }
    },
    mounted() {
        // console.log('mounted');
        var userinfo = JSON.parse(localStorage.getItem('info'));
        console.log(!userinfo);
        console.log(userinfo.role != 0);
        if ((!userinfo || userinfo.role != 0)) {
            this.redirectToPage();
        }
        this.userinfo=userinfo;
        this.roleMap = new Map()
        this.roleMap.set('0', '系統管理者');
        this.roleMap.set('1', '一般使用者');

        this.getAllUser();
        this.getLoginLog();
    },
    methods: {
        getLoginLog() {
            const self = this;
            const loginPath = 'http://localhost/Webapi/LoginEvent/QueryLoginEvent.php'
            fetch(loginPath)
                .then(function (response) {
                    return response.json();
                })
                .then(function (myJson) {
                    self.loginLog = myJson.datas;
                });
        },
        getAllUser() {
            const self = this;
            const userPath = 'http://localhost/Webapi/Member/QueryMember.php'
            fetch(userPath)
                .then(function (response) {
                    return response.json();
                })
                .then(function (myJson) {
                    self.users = myJson.datas;
                });
        },
        convertToRoleText(roleNum) {
            if (!this.roleMap.has(roleNum)) {
                return '查無此權限';
            }
            return this.roleMap.get(roleNum);
        },
        redirectToPage() {
            console.log('redirect')
            window.location.replace("Login.html")
        },
        addMember() {
            this.editState = true;
            this.clearEdit();
        },
        editUser(user) {
            console.log(user);
            this.editState = true;
            this.model = {
                account: user.account,
                password: user.password,
                role: user.role,
                id: user.id
            };
        },
        deleteUser(user) {
            const self = this;
            var formBody = new FormData();
            formBody.set('ID', user.id);
            const deletUserPath = 'http://localhost/Webapi/Member/DeleteAccount.php'
            fetch(deletUserPath, {
                method: 'POST',
                body: formBody
            }).then(function (response) {
                console.log(response);
                return response.json();
            })
                .then(function (myJson) {
                    console.log(myJson);
                    if (myJson.State == 1) {
                        alert(myJson.Message);
                    }
                    self.getAllUser();
                });
        },
        saveUser() {
            this.editState = false;
            const self = this;
            var apiPath = 'http://localhost/Webapi/Member/'
                + (self.model.id != 0 ? 'ReviseAccount.php'
                    : 'InsertAccount.php');
            var formBoby = new FormData();
            formBoby.set('ID', self.model.id);
            formBoby.set('Account', self.model.account);
            formBoby.set('Password', self.model.password);
            formBoby.set('Role', self.model.role);

            fetch(apiPath, {
                method: 'POST',
                body: formBoby
            }).then(function (response) {
                console.log(response);
                return response.json();
            }).then(function (myJson) {
                console.log(myJson);
                if (myJson.State == 1) {
                    alert(myJson.Message);
                }
                self.getAllUser();
            });
        },
        cancelUser() {
            this.editState = false;
            this.clearEdit();
        },
        clearEdit() {
            this.model = {
                account: '',
                password: '',
                role: 0,
                id: 0,
            };
        },
        menuEvent(eventNum) {
            if (eventNum == 3) {
                window.location.replace("WorkItem.html")
            }
            this.menuState = eventNum;
            console.log(eventNum);
        },
    },
}).mount('#app')
