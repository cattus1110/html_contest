Vue.createApp({
    data() {
        return {
            message: 'Login',
            userInfo: {},
            sortArray: [{
                name: '普通件', id: 1
            }, {
                name: '速件', id: 2
            }, {
                name: '最速件', id: 3
            }],
            stateArray: [{
                name: '未處理', id: 1
            }, {
                name: '處理中', id: 2
            }, {
                name: '已完成', id: 3
            }],
            searchCondition: {
                Datetime: '',
                State: 0,
                Sort: 0,
                UserID: 0,
            },
            workItemsArray: {
                workItems: [],
                wi00: [],
                wi02: [],
                wi04: [],
                wi06: [],
                wi08: [],
                wi10: [],
                wi12: [],
                wi14: [],
                wi16: [],
                wi18: [],
                wi20: [],
                wi22: [],
            },
            model: {
                workName: "",
                workStartTime: "",
                workEndTime: "",
                workState: 1,
                workSort: 1,
                workContent: "",
                id: 0,
            },
            editState: false,
            menuState: 1,
        }
    },
    mounted() {
        // console.log('mounted');
        var userinfo = JSON.parse(localStorage.getItem('info'));
        if ((!userinfo )) {
            this.redirectToPage();
        }
        this.userInfo = userinfo;
        this.searchCondition.UserID = this.userInfo.id;
        let nowDate = new Date();
        this.searchCondition.Datetime = nowDate.toISOString().split('T')[0];
        this.Search();
    },
    methods: {
        Search() {
            const self = this;
            var apiPath = "http://localhost/Webapi/WorkItem/QueryWorkItemByTime.php"
            var formBody = new FormData();
            formBody.set('Sort', self.searchCondition.Sort);
            formBody.set('UserID', self.searchCondition.UserID);
            formBody.set('State', self.searchCondition.State);
            formBody.set('Datetime', self.searchCondition.Datetime);
            fetch(apiPath, {
                method: 'POST',
                body: formBody
            }).then(function (response) {
                console.log(response);
                return response.json();
            }).then(function (myJson) {
                console.log(myJson);
                self.workItemsArray.workItems = myJson.datas;
                self.workItemsArray.wi00 = myJson.datas.filter(a => {
                    var date = new Date(a.work_starttime);
                    var hour = date.getHours();
                    return (hour >= 0 && hour < 2);
                });
                self.workItemsArray.wi02 = myJson.datas.filter(a => {
                    var date = new Date(a.work_starttime);
                    var hour = date.getHours();
                    return (hour >= 2 && hour < 4);
                });
                self.workItemsArray.wi04 = myJson.datas.filter(a => {
                    var date = new Date(a.work_starttime);
                    var hour = date.getHours();
                    return (hour >= 4 && hour < 6);
                });
                self.workItemsArray.wi06 = myJson.datas.filter(a => {
                    var date = new Date(a.work_starttime);
                    var hour = date.getHours();
                    return (hour >= 6 && hour < 8);
                });
                self.workItemsArray.wi08 = myJson.datas.filter(a => {
                    var date = new Date(a.work_starttime);
                    var hour = date.getHours();
                    return (hour >= 8 && hour < 10);
                });
                self.workItemsArray.wi10 = myJson.datas.filter(a => {
                    var date = new Date(a.work_starttime);
                    var hour = date.getHours();
                    return (hour >= 10 && hour < 12);
                });
                self.workItemsArray.wi12 = myJson.datas.filter(a => {
                    var date = new Date(a.work_starttime);
                    var hour = date.getHours();
                    return (hour >= 12 && hour < 14);
                });
                self.workItemsArray.wi14 = myJson.datas.filter(a => {
                    var date = new Date(a.work_starttime);
                    var hour = date.getHours();
                    return (hour >= 14 && hour < 16);
                });
                self.workItemsArray.wi16 = myJson.datas.filter(a => {
                    var date = new Date(a.work_starttime);
                    var hour = date.getHours();
                    return (hour >= 16 && hour < 18);
                });
                self.workItemsArray.wi18 = myJson.datas.filter(a => {
                    var date = new Date(a.work_starttime);
                    var hour = date.getHours();
                    return (hour >= 18 && hour < 20);
                });
                self.workItemsArray.wi20 = myJson.datas.filter(a => {
                    var date = new Date(a.work_starttime);
                    var hour = date.getHours();
                    return (hour >= 20 && hour < 22);
                });
                self.workItemsArray.wi22 = myJson.datas.filter(a => {
                    var date = new Date(a.work_starttime);
                    var hour = date.getHours();
                    return (hour >= 22 && hour < 24);
                });
            })
        },
        addWorkItem() {
            this.editState = true;
            this.clearEdit();
        },
        clearEdit() {
            this.model = {
                workName: "",
                workStartTime: "",
                workEndTime: "",
                workState: 1,
                workSort: 1,
                workContent: "",
                id:"",
            };
        },
        convertToStateText(sortNum) {
            console.log(sortNum);
            var sort = this.sortArray.find(function (item) {
                return item.id == sortNum;
            });
            if (!sort) {
                return '查無排序';
            }
            return sort.name;
        },
        convertToSortText(sortNum) {
            console.log(sortNum);
            var sort = this.stateArray.find(function (item) {
                return item.id == sortNum;
            });
            if (!sort) {
                return '查無排序';
            }
            return sort.name;
        },
        redirectToPage() {
            console.log('redirect')
            window.location.replace("Login.html");
        },
        editWorkItem(workItem) {
            this.editState = true;
            this.model = {
                workName: workItem.work_name,
                workStartTime: workItem.work_starttime,
                workEndTime: workItem.work_endtime,
                workState: workItem.work_state,
                workSort: workItem.work_sort,
                workContent: workItem.work_content,
                id: workItem.id,
            };
        },
        deleteWorkItem(workItem) {
            const self = this;
            var formBody = new FormData();
            formBody.set("id", workItem.id);
            formBody.set("user_id", self.searchCondition.UserID);
            var deleteWorkItemPath = "http://localhost/Webapi/WorkItem/DeleteWorkItem.php"
            fetch(deleteWorkItemPath, {
                method: 'POST',
                body: formBody
            }).then(function (response) {
                return response.json();
            }).then(function (myJson) {
                console.log(myJson);
                if (myJson.State == 1) {
                    alert(myJson.Message);
                }
                self.Search();
            });
        },
        saveWorkItem() {
            this.editState = false;
            console.log(this.model);
            const self = this;
            var apiPath = 'http://localhost/Webapi/WorkItem/'
                + (self.model.id != 0 ? 'ReviseWorkItem.php'
                    : 'InsertWorkItem.php');
            var formBoby = new FormData();
            formBoby.set('work_name', self.model.workName);
            formBoby.set('work_starttime', self.model.workStartTime);
            formBoby.set('work_endtime', self.model.workEndTime);
            formBoby.set('work_state', self.model.workState);
            formBoby.set('work_sort', self.model.workSort);
            formBoby.set('work_content', self.model.workContent);
            formBoby.set('user_id', self.searchCondition.UserID);
            formBoby.set('id', self.model.id);
            console.log(self.model);
            console.log(self.searchCondition.UserID);
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
                self.Search();
            });
        },
        cancelWorkItem() {
            this.editState = false;
            this.clearEdit();
        },
        menuEvent(eventNum) {
            if (eventNum == 3) {
                window.location.replace("WorkItem.html")
            } else if (eventNum == 1) {
                window.location.replace("ManagementMember.html")
            }
            this.menuState = eventNum;
            console.log(eventNum);
        }
        ,
    },
}).mount('#app')
