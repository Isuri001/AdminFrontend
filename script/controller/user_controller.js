import {getKey} from "../db/db.js";

export class UserController {
    constructor() {
        $("#btnSaveUser").click(e => {
            e.preventDefault();
            this.saveCustomer();
        });

        $("#txtSearchCustomer").keydown(e => {
            if (e.keyCode == 13) {
                e.preventDefault();
                let customerMail = $('#txtSearchCustomer').val();
                console.log(customerMail)
                this.searchCustomer(customerMail)
            }

        });

        $("#btnUpdateUser").click(e => {
            e.preventDefault();
            this.updateCustomer();
        });

        $("#btnClearCustomerDetails").click(e => {
            e.preventDefault();
            console.log("pressed")
            this.clearForm()
        })


    }

    saveCustomer() {
        let name = $("#user_name").val();
        let contact = $("#user_contact").val();
        let email = $("#user_email").val();
        let birthday = $("#user_birthday").val();
        let gender = $("#user_gender:checked").val() ? "male" : "female";
        var profile_pic = $('#user_profile_pic').prop('files')[0];
        var nic_front = $('#user_nic_front').prop('files')[0];
        var nic_rear = $('#user_nic_rear').prop('files')[0];
        let nic = $("user_nic").val();


        /*console.log("Name : "+name);
        console.log("Contact : "+contact);
        console.log("Email : "+email);
        console.log("Birthday : "+birthday);
        console.log("Gender : "+gender);
        console.log("Profile Pic : "+profile_pic);
        console.log("NIC Front : "+nic_front);
        console.log("NIC Rear : "+nic_rear);*/


        var form = new FormData();
        form.append("userName", name);
        form.append("password", "123456");
        form.append("contact", contact);
        form.append("email", email);
        form.append("birthday", birthday);
        form.append("gender", gender);
        form.append("nicNo", nic);
        form.append("profilePic", profile_pic, "file");
        form.append("nicFront", nic_front, "file");
        form.append("nicRear", nic_rear, "file");

        var settings = {
            "url": "http://localhost:8081/api/v1/user/0",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Authorization": "Bearer " + getKey(),
            },
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            "data": form
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
        }).fail(e => {
            console.log(e.code)
        });


    }

    searchCustomer(email) {

        var settings = {
            "url": "http://localhost:8081/api/v1/user/0/" + email,
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Authorization": "Bearer " + getKey()
            },
        };

        $.ajax(settings).done(function (responseData) {
            $("#user_email").prop('readonly', true);
            console.log(responseData.nicFrontByte)
            console.log(responseData.nicRearByte)
            console.log(responseData.profilePic)
            console.log(responseData.nicFront)
            console.log(responseData.nicRear)
            //$('#id').text(responseData.id);
            $('#user_name').val(responseData.username);
            $('#user_nic').val(responseData.usernic);
            $('#user_contact').val(responseData.contact);
            $('#user_email').val(responseData.email);
            $('#user_birthday').val(responseData.birthday);
            console.log(responseData.birthday)
            $('#user_nic_front_img').attr('src', "data:image/jpeg;base64," + responseData.nicFront); // Set the src attribute for an image element
            $('#user_nic_rear_img').attr('src', "data:image/jpeg;base64," + responseData.nicRear);   // Set the src attribute for an image element
            if (responseData.gender === 'male') {
                $("#user_gender").prop('checked', true);
            } else {
                $("#user_gender").prop('checked', false);
            }
            //$('#remarks').text(responseData.remarks);
            $('#user_profile_pic_img').attr('src', "data:image/jpeg;base64," + responseData.profilePic); // Set the src attribute for an image element


        });
    }

    updateCustomer() {
        let name = $("#user_name").val();
        let contact = $("#user_contact").val();
        let email = $("#user_email").val();
        let birthday = $("#user_birthday").val();
        let gender = $("#user_gender:checked").val() ? "male" : "female";
        var profile_pic = $('#user_profile_pic').prop('files')[0];
        var nic_front = $('#user_nic_front').prop('files')[0];
        var nic_rear = $('#user_nic_rear').prop('files')[0];
        let nic = $("user_nic").val();


        var form = new FormData();
        form.append("userName", name);
        form.append("password", "123456");
        form.append("contact", contact);
        form.append("email", email);
        form.append("birthday", birthday);
        form.append("gender", gender);
        if (profile_pic)
            form.append("profilePic", profile_pic, "ab.jpg");
        if (nic_front)
            form.append("nicFront", nic_front, "aa.jpg");
        if (nic_rear)
            form.append("nicRear", nic_rear, "ac.jpg");
        form.append("nicNo", nic);

        var settings = {
            "url": "http://localhost:8081/api/v1/user/0",
            "method": "PUT",
            "timeout": 0,
            "headers": {
                "Authorization": "Bearer " + getKey()
            },
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            "data": form
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
        });
    }

    clearForm() {
        $("#user_name").val('');
        $("#user_contact").val('');
        $("#user_email").val('');
        $("#user_birthday").val('');
        $("input[name=user_gender]").prop('checked', false);
        $('#user_profile_pic').val('');
        $('#user_nic_front').val('');
        $('#user_nic_rear').val('');
        $("#user_nic").val('');

        // Change the src of the image elements
        $("#user_profile_pic_img").attr('src', 'assert/img/upload.png');
        $("#user_nic_front_img").attr('src', 'assert/img/upload.png');
        $("#user_nic_rear_img").attr('src', 'assert/img/upload.png');
        $("#user_email").prop('readonly', false);
    }


}

new UserController();