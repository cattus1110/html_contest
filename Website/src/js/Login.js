Vue.createApp({
    data() {
        return {
            message: 'Login',
            verifyCode: '',
            failCount: 0,
            model: {
                account: '',
                password: '',
                verifyCode: '',
            }
        }
    },
    mounted() {
        // console.log('mounted');
        this.randomVerifyCode();
    },
    methods: {
        randomVerifyCode() {
            const self = this;
            const path = 'http://localhost/Webapi/Member/GetVerificationCode.php';

            fetch(path)
                .then(function (response) {
                    return response.json();
                })
                .then(function (myJson) {
                    self.verifyCode = myJson.datas;
                    console.log(self.verifyCode);
                });
        },
        checkAccount() {
            const self = this;
            if (self.failCount >= 3) {
                alert('登入失敗!');
                self.failCount++;
                return;
            }
            if (self.verifyCode != self.model.verifyCode) {
                alert('驗證碼錯誤!');
                self.failCount++;
                return;
            }
            if (self.model.account == '') {
                alert('請輸入帳號!');
                self.failCount++;
                return;
            }
            if (self.model.password == '') {
                alert('請輸入密碼!');
                self.failCount++;
                return;
            }
            var formBody = new FormData();
            formBody.set('Account', self.model.account);
            formBody.set('Password', self.model.password);
            const checkPath = 'http://localhost/Webapi/Member/CheckAccount.php'
            fetch(checkPath, {
                method: 'POST',
                body: formBody
            }).then(function (response) {
                console.log(response);
                return response.json();
            })
                .then(function (myJson) {
                    console.log(myJson);
                    if (myJson.State != 3) {
                        self.failCount++;
                        alert(myJson.Message);
                    } else {
                        var user = {
                            account: self.model.account,
                            role: myJson.Role,
                            id:myJson.id
                        }
                        localStorage.setItem('info', JSON.stringify(user));
                        //跳轉頁面
                        self.redirectToPage();
                    }
                })
        },
        redirectToPage() {
            console.log('redirectToPage')
            window.location.replace("WorkItem.html")
        }
    },
}).mount('#app')
