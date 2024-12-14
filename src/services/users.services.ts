import { Injectable } from "@nestjs/common";
import { firebaseAdmin } from "src/config/firebase.setup";

@Injectable()
export class UserService {
    constructor(private readonly admin: firebaseAdmin) {}

    async create(email: string, password: string) {
        try {
            const firebaseAuth = this.admin.setup();
            const new_user = await firebaseAuth.auth().createUser({
                email,
                password
            });
            console.log(new_user)
        } catch (error) {
            console.log(error)
        }
    }

    async findByUid(uid: string) {
        try {
          const user = await this.admin.setup().auth().getUser(uid);
          return user;
        } catch (error) {
          console.log('Error buscando usuario por UID:', error);
          throw new Error('Usuario no encontrado');
        }
    }
}