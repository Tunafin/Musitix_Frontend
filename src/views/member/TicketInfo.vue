<template>
    <div class="container ticket-body">
        <div v-if="TicketInfo.data">
            <h2 class="ticket-title">{{ TicketInfo.data.order.activityInfo.title }}</h2>
            <div class="ticket-info">
                <div class="ticket-info-region">
                    <div class="ticket-image">
                        <img :src="TicketInfo.data.order.activityInfo.mainImageUrl" alt="ticket-image">
                    </div>
                    <div class="d-flex">
                        <p class="name">演出時間</p>
                        <p class="content">{{ dateFormatUTC(TicketInfo.data.order.activityInfo.startDate, 'YYYY/MM/DD (dd) hh:mm')
                        }} </p>
                    </div>
                    <div class="d-flex">
                        <p class="name">地點</p>
                        <p class="content">
                            {{ TicketInfo.data.order.activityInfo.location }}<br />{{ TicketInfo.data.order.activityInfo.address }} </p>
                    </div>
                    <div class="d-flex">
                        <p class="name">場次</p>
                        <p class="content">{{ TicketInfo.data.order.ticketList[0].scheduleName }} </p>
                    </div>
                    <div class="d-flex">
                        <p class="name">票數 </p>
                        <p class="content">{{ TicketInfo.data.order.activityInfo.ticketTotalCount }} 張 </p>
                    </div>
                    <div class="d-flex">
                        <p class="name">總金額 </p>
                        <p class="content">{{ TicketInfo.data.order.activityInfo.totalAmount }} 元</p>
                    </div>
                </div>
                <div class="ticket-action" v-if="TicketInfo.data.order.orderStatus == 2">
                    <button class="btn pay-btn" @click="Pay()">立即付款</button>
                    <button class="btn cancel-btn" @click="CancelModalShow = true">取消訂票</button>
                </div>
            </div>
            <div class="order-info">
                <div class="d-flex">
                    <p class="name">訂單編號</p>
                    <p class="content">{{ TicketInfo.data.order.orderNumber }}</p>
                </div>
                <div class="d-flex">
                    <p class="name">訂單成立時間</p>
                    <p class="content">{{ TicketInfo.data.order.orderCreateDate }}</p>
                </div>
                <div class="d-flex">
                    <p class="name">狀態</p>
                    <p class="content" :class="status.find(x => x.status == TicketInfo.data?.order.orderStatus)?.class">{{
                        status.find(x => x.status == TicketInfo.data?.order.orderStatus)?.title }}</p>
                </div>
                <div class="d-flex">
                    <p class="name">訂購人</p>
                    <p class="content">{{ TicketInfo.data.order.buyer }}</p>
                </div>
                <div class="d-flex">
                    <p class="name">手機號碼</p>
                    <p class="content">{{ TicketInfo.data.order.cellPhone }}</p>
                </div>
                <div class="d-flex">
                    <p class="name">聯絡信箱</p>
                    <p class="content">{{ TicketInfo.data.order.email }}</p>
                </div>
                <div class="d-flex">
                    <p class="name">地址</p>
                    <p class="content">{{ TicketInfo.data.order.address }}</p>
                </div>
                <div class="d-flex">
                    <p class="name">備註</p>
                    <p class="content">{{ TicketInfo.data.order.memo }}</p>
                </div>

            </div>
            <h2 class="ticket-info-title">票券明細</h2>
            <div class="table">
                <div class="th">
                    <div class="td">
                        狀態
                    </div>
                    <div class="td">
                        票卷編號
                    </div>
                    <div class="td">
                        價格
                    </div>
                    <div class="td">
                        票種
                    </div>
                    <div class="td">
                        選單
                    </div>
                </div>
                <div class="tr" v-for="item in TicketInfo.data.order.ticketList">
                    <div class="td">
                        <span class="btn rounded-pill my-auto"
                            :class="status.find(x => x.status == item.ticketStatus)?.class">{{
                                status.find(x => x.status ==
                                    item.ticketStatus)?.title }}</span>
                    </div>
                    <div class="td">
                        {{ item.ticketNumber }}
                    </div>
                    <div class="td">
                        {{ item.price }}
                    </div>
                    <div class="td">
                        {{ item.categoryName }}
                    </div>
                    <div class="td">
                        <button type="button" class="btn ticket-info-btn" :disabled="item.ticketStatus !== 1"
                            @click="ShowQRModal(item.ticketNumber)">顯示QRCode</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Modal v-model="QRModalShow" v-if="TicketInfo.data" :title="''" :backdrop-disabled="true" :is-centered="true"
        :size="'lg'" :hide-footer="true">
        <div class="modal-body">
            <div class="Qrcode-Region">
                <div class="QRCode">
                    <img :src="ModalQRCode" alt="">
                </div>
                <div>
                    <span class="btn rounded-pill" :class="status.find(x => x.status == ModalTicketStatus)?.class">{{
                        status.find(x => x.status ==
                            ModalTicketStatus)?.title }}</span>
                </div>
            </div>
            <div>
                <h2 class="ticket-title">{{ TicketInfo.data.order.activityInfo.title }}</h2>
                <div class="d-flex">
                    <p class="name">演出時間</p>
                    <p class="content">{{ dateFormatUTC(TicketInfo.data.order.activityInfo.startDate, 'YYYY/MM/DD (dd) hh:mm')
                    }} </p>
                </div>
                <div class="d-flex">
                    <p class="name">地點</p>
                    <p class="content">
                        <span class="fw-bold">{{ TicketInfo.data.order.activityInfo.location }}</span> <br />{{
                            TicketInfo.data.order.activityInfo.address }}
                    </p>
                </div>
                <div class="d-flex">
                    <p class="name">票種</p>
                    <p class="content">
                        {{ ModalTicketSchedule }} {{ ModalTicketPrice }} </p>
                </div>
                <div class="d-flex">
                    <p class="name">場次</p>
                    <p class="content">{{ TicketInfo.data.order.ticketList[0].scheduleName }} </p>
                </div>
                <div class="notice">
                    <h6>注意事項</h6>
                    <ul>
                        <li>1. 每個QR code代表一張票，僅供單人使用。</li>
                        <li>2. 每個QR code使用後即失效，無法重複入場。</li>
                    </ul>
                </div>
            </div>
        </div>
    </Modal>
    <Modal v-model="CancelModalShow" class="cancelModal" v-if="TicketInfo.data" :title="''" :backdrop-disabled="true" :is-centered="true"
        :size="'lg'" :hide-footer="true">
        <div>
            <h2 class="ticket-title">{{ TicketInfo.data.order.activityInfo.title }}</h2>
            <div class="event-info">
                <div class="d-flex">
                    <p class="name">演出時間</p>
                    <p class="content">{{ dateFormatUTC(TicketInfo.data.order.activityInfo.startDate, 'YYYY/MM/DD (dd) hh:mm')
                    }} </p>
                </div>
                <div class="d-flex">
                    <p class="name">地點</p>
                    <p class="content">
                        <span class="fw-bold">{{ TicketInfo.data.order.activityInfo.location }}</span> <br />{{
                            TicketInfo.data.order.activityInfo.address }}
                    </p>
                </div>
                <div class="d-flex">
                    <p class="name">場次</p>
                    <p class="content">{{ TicketInfo.data.order.ticketList[0].scheduleName }} </p>
                </div>
            </div>
            <div class="ticket-info">
            <div class="d-flex">
                <p class="name">訂單編號</p>
                <p class="content">{{ TicketInfo.data.order.orderNumber }} </p>
            </div>           
            <div class="d-flex">
                <p class="name">票數</p>
                <p class="content">{{ TicketInfo.data.order.activityInfo.ticketTotalCount}} </p>
            </div>
            <div class="d-flex">
                <p class="name">原始訂單金額</p>
                <p class="content text-danger">{{ TicketInfo.data.order.activityInfo.totalAmount }} 元 </p>
            </div>
            <div class="d-flex">
                <p class="name">預計退款金額</p>
                <p class="content  text-danger">{{TicketInfo.data.order.activityInfo.totalAmount  }} 元 </p>
            </div>
        </div>
            <div class="notice">
                <h6>注意事項</h6>
                <ul>
                    <li>1. 取消訂票為取消此訂單的所有票券，無單一票券退票功能。</li>
                    <li>2.  活動開始前一週 ～ 前三天，退款 10% 總金額。</li>
                    <li>3. 取消訂票需由主辦方人工審核，至少需要七個工作天，請耐心等候。</li>
                    <li>4. 審核期間，票券狀態為「審核中」；退票完成後，票券狀態為「已退票」。 </li>
                    <li>5. 若有任何疑問，請向客服聯繫。</li>
                </ul>
            </div>
            <div class="my-3 text-center">                
                <div class="d-inline-block" @click="CancelCheck = !CancelCheck">
                    <input type="checkbox" class="me-3 cancelCheck"  id="check"  :checked="CancelCheck" >
                <span >我已閱讀以上注意事項並確定繼續操作</span>     
                </div>
                      
            </div>
            <div class="text-center">
                <button class="btn btn-danger cancel-modal-btn" :disabled="!CancelCheck" @click="ModalCancelCheck()">取消訂單</button>
            </div>
        </div>
    </Modal>
</template>
<script setup lang="ts">
import { ref, watch, reactive, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { dateFormatUTC } from '@/utils/dateFormat'
import Modal from '../../components/Modal.vue'
import { deleteOrder, getOrderInfo } from '@/apis/users/ticket';
import { useToast } from 'vue-toastification';

const route = useRoute()
const router = useRouter()
const status = ref([
    {
        title: "狀態",
        status: -1,
        class: ""
    },
    {
        title: "可使用",
        status: 1,
        class: "status-success"
    },
    {
        title: "待付款",
        status: 2,
        class: "status-wait"

    },
    {
        title: "已使用",
        status: 3,
        class: "status-stop"
    },
    {
        title: "已過期",
        status: 4,
        class: "status-stop"
    },
    {
        title: "已退票",
        status: 5,
        class: "status-stop"
    },
    {
        title: "審核中",
        status: 6,
        class: "status-wait"
    },
    {
        title: "付款失敗",
        status: 0,
        class: "status-stop"
    }
])
interface TicketInfoClass {
    "order": {
		        "_id": string,
		        "buyer": string,
		        "cellPhone":string,
		        "email": string,
		        "address": string,
		        "orderNumber": string,
		        "orderStatus": number,
		        "orderCreateDate": string,
		        "memo": string,
		        "ticketList": 
		            {
		                "scheduleName": string,
		                "categoryName": string,
		                "price": number,
		                "ticketNumber": string,
		                "ticketStatus": number,
		                "qrCode": string,
		                "_id": string
		            }[]		           
		        ,
		        "activityInfo": {
		            "title": string,
		            "sponsorName": string,
		            "location": string,
		            "address": string,
		            "startDate": string,
		            "endDate": string,
		            "mainImageUrl": string,
		            "totalAmount": number,
		            "ticketTotalCount": number,
		            "ticketCategories": []
		        },
		        "activityId": string,
		        "userId": string,
		        "__v": number
				}
				"TimeStamp": number,
        "MerchantID": "藍新商店代號",
        "Version": "1.5",
        "aesEncrypt": "藍新 aesEncrypt",
        "shaEncrypt": "藍新 shaEncrypt"
}
const TicketInfo = reactive<{ "data": TicketInfoClass | null }>({ "data": null })

GetDate()

function GetDate() {
    console.log(route.params.id)
    getOrderInfo(route.params.id as string).then(response=>{
        console.log(response.data)
        TicketInfo.data = response.data.data
    })

}
//QRCodeModal
const QRModalShow = ref(false)
const ModalQRCode = ref("")
const ModalTicketStatus = ref(0)
const ModalTicketSchedule = ref("")
const ModalTicketPrice = ref(0)
function ShowQRModal(ticketNumber: string) {
    let TicketList = TicketInfo.data?.order.ticketList.find(x => x.ticketNumber == ticketNumber)
    QRModalShow.value = true
    ModalQRCode.value = TicketList?.qrCode ?? ""
    ModalTicketStatus.value = TicketList?.ticketStatus ?? 0
    ModalTicketSchedule.value = TicketList?.scheduleName ?? ""
    ModalTicketPrice.value = TicketList?.price ?? 0
}
function Pay() {
    const form = document.createElement('form');
    form.method = 'post'
    form.action = 'https://ccore.newebpay.com/MPG/mpg_gateway'   
    const formData = {
        "MerchantID": TicketInfo.data?.MerchantID,
        "Version": TicketInfo.data?.Version, // 用最新版 1.5 即可
        "MerchantOrderNo": TicketInfo.data?.order.orderNumber,
        "Amt": TicketInfo.data?.order.activityInfo.totalAmount,
        "Email": TicketInfo.data?.order.email,
        "TimeStamp": TicketInfo.data?.TimeStamp, // 時間格式 1684224973
        "TradeSha": TicketInfo.data?.shaEncrypt,
        "TradeInfo": TicketInfo.data?.aesEncrypt
    }
    for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
            const hiddenField = document.createElement('input');
            hiddenField.type = 'hidden';
            hiddenField.name = key;
            hiddenField.value = formData[key as keyof typeof formData]?.toString() ?? "";
            form.appendChild(hiddenField);
        }
    }
    document.body.appendChild(form);
    nextTick(()=>{
        form.submit()
    })    

}
//CancelModal
const CancelModalShow = ref(false)
const CancelCheck = ref(false)
const Toast = useToast()
function ModalCancelCheck(){
    if(TicketInfo.data?.order.activityId){
        deleteOrder(TicketInfo.data?.order._id).then(response => {
      Toast.success("訂單取消成功");
      CancelModalShow.value = false
      GetDate()
    })
    .catch(error => {
      Toast.error(error.response.data.message)      
    })
    }
    
}
</script>

<style scoped lang="scss">
.ticket-body {
    padding: 20px 40px;
    background: #FFFFFF;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);
    border-radius: 48px;
    margin-bottom: 24px;
}

.ticket-title {
    color: var(--primary-color);
    font-weight: 900;
    padding-bottom: 24px;

}

.ticket-info {
    .name {
        font-weight: bold;
        width: 68px;
        text-align: justify;
        text-align-last: justify;
    }

    .content {
        margin-left: 24px;
        padding-left: 24px;
        border-left: 1px solid black;
    }

}

.ticket-info-region {
    position: relative;
    padding-right: 400px;

    .ticket-image img {
        position: absolute;
        top: 0;
        right: 0;
        max-height: 100%;
        max-width: 400px;
        border-radius: 48px;
        overflow: hidden;

    }
}

.order-info {
    padding: 24px 0;
    border-bottom: 1px solid var(--gray);

    .name {
        font-weight: bold;
        width: 112px;
        text-align: center;
    }

    .content {
        margin-left: 24px;
        padding-left: 24px;
        border-left: 1px solid black;
    }
}

.ticket-action {
    display: flex;
    margin-top: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--gray);

    .pay-btn {
        background-color: var(--primary-color);
        color: #FFFFFF;
        padding: 8px 68px;
    }

    .cancel-btn {
        margin-left: 24px;
        padding: 8px 68px;
        border: 1px solid black;

    }
}

.ticket-info-title {
    color: var(--primary-color);
    font-weight: 900;
    padding: 24px 0;
}

.status-success {
    color: var(--dark-green-color);
    border-color: var(--dark-green-color);
    cursor: default;
}

.status-wait {
    color: var(--orange-color);
    border-color: var(--orange-color);
    cursor: default;
}


.status-stop {
    color: var(--secondary-color);
    border-color: var(--secondary-color);
    cursor: default;
}

.table {

    .th,
    .tr {
        display: flex;

        .td {
            margin-right: 24px;

            display: flex;
            justify-content: center;
            align-items: center;
            word-break: break-all;

            &:nth-child(1) {
                width: 90px;
                border: none;
            }

            &:nth-child(2) {
                width: 110px;
                flex-grow: 1;
            }

            &:nth-child(3) {
                width: 100px;
            }

            &:nth-child(4) {
                width: 110px;
            }

            &:nth-child(5) {
                width: 150px;
                margin-right: 0;
            }
        }
    }

    .th {
        margin-bottom: 24px;

        .td {
            color: var(--primary-color);
            border-color: var(--primary-color);
            border-right: 1px solid black;
            border-left: 1px solid black;
        }
    }

    .tr {
        padding: 8px 0;
        border-bottom: 1px solid var(--gray);

        .td {}
    }
}

.ticket-info-btn {
    background-color: var(--primary-color);
    color: #FFFFFF;
    width: 100%;

    &:hover {
        background-color: var(--warning-color);
        color: black;
    }
}

.modal-body {
    display: flex;
    margin-top: -30px;

    .QRCode {
        width: 240px;
        height: 240px;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .name {
        font-weight: bold;
        width: 68px;
        text-align: center;
        text-align: justify;
        text-align-last: justify;
    }

    .content {
        margin-left: 24px;
        padding-left: 24px;
        border-left: 1px solid black;
    }

    .notice {
        font-size: 12px;
        margin-top: 24px;

        h6 {
            font-size: 12px;
            font-weight: 700;
        }

    }
}
.cancelModal{
    .event-info{
padding: 24px 0;
border-bottom: 1px solid var(--gray);
}
.ticket-info{
padding: 24px 0;
border-bottom: 1px solid var(--gray);
.name{
    width: 110px;
}
}
.cancel-modal-btn{
    padding: 8px 68px;
}
.cancelCheck{
    pointer-events: none;
}
}

</style>