class User {
    constructor(id, username, password, usernic, contact, email, birthday, nicFront, nicRear, roles, gender, remarks, profilePic) {
        this._id = id;
        this._username = username;
        this._password = password;
        this._usernic = usernic;
        this._contact = contact;
        this._email = email;
        this._birthday = birthday;
        this._nicFront = nicFront;
        this._nicRear = nicRear;
        this._roles = roles;
        this._gender = gender;
        this._remarks = remarks;
        this._profilePic = profilePic;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get username() {
        return this._username;
    }

    set username(value) {
        this._username = value;
    }

    get password() {
        return this._password;
    }

    set password(value) {
        this._password = value;
    }

    get usernic() {
        return this._usernic;
    }

    set usernic(value) {
        this._usernic = value;
    }

    get contact() {
        return this._contact;
    }

    set contact(value) {
        this._contact = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get birthday() {
        return this._birthday;
    }

    set birthday(value) {
        this._birthday = value;
    }

    get nicFront() {
        return this._nicFront;
    }

    set nicFront(value) {
        this._nicFront = value;
    }

    get nicRear() {
        return this._nicRear;
    }

    set nicRear(value) {
        this._nicRear = value;
    }

    get roles() {
        return this._roles;
    }

    set roles(value) {
        this._roles = value;
    }

    get gender() {
        return this._gender;
    }

    set gender(value) {
        this._gender = value;
    }

    get remarks() {
        return this._remarks;
    }

    set remarks(value) {
        this._remarks = value;
    }

    get profilePic() {
        return this._profilePic;
    }

    set profilePic(value) {
        this._profilePic = value;
    }
}
