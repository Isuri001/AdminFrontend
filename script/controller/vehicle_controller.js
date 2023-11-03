import {getKey} from "../db/db.js";

export class VehicleController{

    constructor() {
        $("#btnSaveVehicle").click(e=>{
            e.preventDefault();
            this.saveData();
        })

        $("#btnSearchVehicle").click(e=>{
            e.preventDefault();
            this.searchVehicle();
        })

        $("#btnUpdateVehicle").click(e=>{
            e.preventDefault();
            this.updateVehicle();
        })
    }

    saveData(){
        let name = $("#vehicle_name").val();
        let type = $("#vehicle_type").val();
        let fuelType = $("#vehicle_fuel_type:checked") ? "DIESEL" : "PETROL";
        let isHybrid = $("#vehicle_is_hybrid:checked") ? true : false;
        var frontview = $('#vehicle_front_view').prop('files')[0];
        var backview = $('#vehicle_rear_view').prop('files')[0];
        let front_interior = $("#vehicle_front_interior").prop("files")[0];
        let back_interior = $("#vehicle_rear_interior").prop("files")[0];
        let side_view = $("#vehicle_side_view").prop("files")[0];
        let priceFor1Km = $("#vehicle_price_for_1km").val();
        let priceFor100Km = $("#vehicle_price_for_100km").val();
        let seatCapacity = $("#vehicle_seat_capacity").val();
        let fuelUsage = $("#vehicle_fuel_usage").val();
        let category = $("#vehicle_category").val();
        let isTransmissionManual = $("#vehicle_is_transmission_manual:checked") ? "AUTO" : "MANUAL";

        let d_name = $("#driver_name").val();
        let contact = $("#driver_contact").val();
        let nic = $("#driver_nic").val();
        let l_front = $("#driver_license_front").prop("files")[0];
        let l_back = $("#driver_licence_rear").prop("files")[0];

        console.log("Name : "+name);
        console.log("Type : "+type);
        console.log("Fuel Type : "+fuelType);
        console.log("Is Hybrid : "+isHybrid);
        console.log("Price For 1KM : "+priceFor1Km);
        console.log("Price For 100KM : "+priceFor100Km);
        console.log("Seat Capacity : "+seatCapacity);
        console.log("Fuel Usage : "+fuelUsage);
        console.log("Category : "+category);
        console.log("Transmission : "+isTransmissionManual);




        var form = new FormData();
        form.append("vehicleName", name);
        form.append("fuelType", fuelType);
        form.append("isHybrid", isHybrid);
        form.append("files", frontview, );
        form.append("files", backview);
        form.append("files", front_interior);
        form.append("files", back_interior);
        form.append("files", side_view);
        form.append("priceFor1Km", priceFor1Km);
        form.append("fuelUsage", fuelUsage);
        form.append("priceFor100Km", priceFor100Km);
        form.append("noOfSeats", seatCapacity);
        form.append("vehicleType", type);
        form.append("category", category);
        form.append("transmission", isTransmissionManual);
        form.append("driverName", d_name);
        form.append("nicNo", nic);
        form.append("contactNO", contact);
        form.append("licenceImageFront", l_front, "0 K7AX-9LifDGEKEoZ.jpg");
        form.append("licenceImageRear", l_back, "Importance-of-Driving-License.jpg");
        form.append("remarks", "No");

        var settings = {
            "url": "http://localhost:8083/api/v1/vehicle",
            "method": "POST",
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

    searchVehicle(){
        var settings = {
            "url": "http://localhost:8083/api/v1/vehicle/"+$("#txtSearchVehicle").val(),
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Authorization": "Bearer " + getKey()
            },
        };

        $.ajax(settings).done(function (vehicleDTO) {
            console.log(vehicleDTO);
            // Assuming 'vehicleDTO' is the response from your Spring Boot API

            // Set vehicle information
            $("#vehicle_id").val(vehicleDTO.id);
            $("#vehicle_name").val(vehicleDTO.name);
            $("#vehicle_type").val(vehicleDTO.vehicleType);
            $("#vehicle_price_for_1km").val(vehicleDTO.priceFor1Km);
            $("#vehicle_price_for_100km").val(vehicleDTO.priceFor100Km);
            $("#vehicle_seat_capacity").val(vehicleDTO.seatCapacity);
            $("#vehicle_fuel_usage").val(vehicleDTO.fuelUsage);
            $("#vehicle_category").val(vehicleDTO.category);

            // Set radio buttons and checkboxes
            if (vehicleDTO.fuelType === "DIESEL") {
                $("#vehicle_fuel_type").prop("checked", false);
            } else {
                $("#vehicle_fuel_type").prop("checked", true);
            }

            if (vehicleDTO.hybrid) {
                $("#vehicle_is_hybrid").prop("checked", true);
            }else {
                $("#vehicle_is_hybrid").prop("checked", false);
            }

            if (vehicleDTO.transmission === "AUTO") {
                $("#vehicle_is_transmission_manual").prop("checked", true);
            } else {
                $("#vehicle_is_transmission_manual").prop("checked", false);
            }

            // Assuming these fields are for the driver information
            $("#driver_name").val(vehicleDTO.driverDTO.name);
            $("#driver_contact").val(vehicleDTO.driverDTO.contact);
            $("#driver_nic").val(vehicleDTO.driverDTO.nic);
            $("#driver_id").val(vehicleDTO.driverDTO.id);

            // Assuming these fields are for driver license images
            // Assuming 'licenseImageFront' and 'licenseImageRear' are byte arrays in vehicleDTO
            // You'll need to handle these separately, possibly using FileReader to display images
            // Assuming 'vehicleDTO' is the response from your Spring Boot API

            // Display vehicle images
            $('#vehicle_front_view_img').attr('src', `data:image/jpg;base64,${vehicleDTO.images[0]}`);
            $('#vehicle_rear_view_img').attr('src', `data:image/jpg;base64,${vehicleDTO.images[1]}`);
            $('#vehicle_side_view_img').attr('src', `data:image/jpg;base64,${vehicleDTO.images[2]}`);
            $('#vehicle_front_interior_img').attr('src', `data:image/jpg;base64,${vehicleDTO.images[3]}`);
            $('#vehicle_rear_interior_img').attr('src', `data:image/jpg;base64,${vehicleDTO.images[4]}`);

            // Display driver license images
            $('#driver_license_front_img').attr('src', `data:image/jpg;base64,${vehicleDTO.driverDTO.licenseImageFront}`);
            $('#driver_licence_rear_img').attr('src', `data:image/jpg;base64,${vehicleDTO.driverDTO.licenseImageRear}`);


        });
    }

    updateVehicle(){
        let name = $("#vehicle_name").val();
        let type = $("#vehicle_type").val();
        let fuelType = $("#vehicle_fuel_type:checked") ? "DIESEL" : "PETROL";
        let isHybrid = $("#vehicle_is_hybrid:checked") ? true : false;
        var frontview = $('#vehicle_front_view').prop('files')[0];
        var backview = $('#vehicle_rear_view').prop('files')[0];
        let front_interior = $("#vehicle_front_interior").prop("files")[0];
        let back_interior = $("#vehicle_rear_interior").prop("files")[0];
        let side_view = $("#vehicle_side_view").prop("files")[0];
        let priceFor1Km = $("#vehicle_price_for_1km").val();
        let priceFor100Km = $("#vehicle_price_for_100km").val();
        let seatCapacity = $("#vehicle_seat_capacity").val();
        let fuelUsage = $("#vehicle_fuel_usage").val();
        let category = $("#vehicle_category").val();
        let isTransmissionManual = $("#vehicle_is_transmission_manual:checked") ? "AUTO" : "MANUAL";

        let d_name = $("#driver_name").val();
        let contact = $("#driver_contact").val();
        let nic = $("#driver_nic").val();
        let l_front = $("#driver_license_front").prop("files")[0];
        let l_back = $("#driver_licence_rear").prop("files")[0];


        if (!frontview){
            frontview = this.dataURLtoFile($('#vehicle_front_view_img').attr('src'),"Front.jpg")
        }
        if (!backview){
            backview = this.dataURLtoFile($('#vehicle_rear_view_img').attr('src'),"Back.jpg");
        }
        if (!front_interior){
            front_interior = this.dataURLtoFile($('#vehicle_front_interior_img').attr('src'),"Front.jpg");
        }
        if (!back_interior){
            back_interior = this.dataURLtoFile($('#vehicle_rear_interior_img').attr('src'),"Back.jpg");
        }
        if (!side_view){
            side_view = this.dataURLtoFile($('#vehicle_side_view_img').attr('src'),"Side.jpg");
        }
        if (!l_front){
            l_front = this.dataURLtoFile($('#driver_license_front_img').attr('src'),"Front.jpg");
        }
        if (!l_back){
            l_back = this.dataURLtoFile($('#driver_licence_rear_img').attr('src'),"Back.jpg");
        }

        var form = new FormData();
        form.append("vehicleName", name);
        form.append("fuelType", fuelType);
        form.append("isHybrid", isHybrid);
        form.append("files", frontview, );
        form.append("files", backview);
        form.append("files", front_interior);
        form.append("files", back_interior);
        form.append("files", side_view);
        form.append("priceFor1Km", priceFor1Km);
        form.append("fuelUsage", fuelUsage);
        form.append("priceFor100Km", priceFor100Km);
        form.append("noOfSeats", seatCapacity);
        form.append("vehicleType", type);
        form.append("category", category);
        form.append("transmission", isTransmissionManual);
        form.append("driverName", d_name);
        form.append("nicNo", nic);
        form.append("contactNO", contact);
        form.append("licenceImageFront", l_front);
        form.append("licenceImageRear", l_back);
        form.append("remarks", "No");

        var settings = {
            "url": "localhost:8083/api/v1/vehicle/"+$("#vehicle_id").val()+"/"+$("#driver_id").val(),
            "method": "PUT",
            "timeout": 0,
            "headers": {
                "Authorization": "Bearer "+getKey()
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

    dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[arr.length - 1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    }


}
new VehicleController();