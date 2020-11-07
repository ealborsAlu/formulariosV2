import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
selector: 'app-home',
templateUrl: 'home.page.html',
styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
    validation_messages = {
        'Nombre': [
        { type: 'required', message: 'Debe introducir un Nombre' },
        { type: 'minlength', message: 'El nombre debe ser como minimo de 5 letras' },
        { type: 'maxlength', message: 'EL nombre no debe exceder las 5 letras' },
        { type: 'pattern', message: 'Your username must contain only numbers and letters, and must begin with a letter.' },
        { type: 'validUsername', message: 'Your username has already been taken.' }
        ],
        'Apellido': [
        { type: 'required', message: 'Name is required.' }
        ],
        'DNI': [
        { type: 'required', message: 'El dni debe ser introducido.' },
        { type: 'minlength', message: 'Tiene que haber 9 caracteres' },
        { type: 'maxlength', message: 'Tiene que haber 9 caracteres' },
        { type: 'pattern', message: 'El dni solo acepta 8 numeros y 1 letra mayuscula' }
            ],
        'fecha_nac': [
         { type: 'required', message: 'Debe introducir una fecha' }
            ],
        'terms': [
        { type: 'pattern', message: 'Debe aceptar los terminos y condiciones' }
        ],
        };

validations_form: FormGroup;
    


constructor(
public formBuilder: FormBuilder,
private navCtrl: NavController


) { }

ngOnInit() {

this.validations_form = this.formBuilder.group({
Nombre: new FormControl('', Validators.compose([
Validators.maxLength(25),
Validators.minLength(5),
Validators.pattern('^[a-zA-Z]{1}[a-zA-Z0-9]+$'),
Validators.required
])),

Apellido: new FormControl('', Validators.required),


fecha_nac: new FormControl('', Validators.compose([
    this.validaFecha,
    Validators.required

])),
DNI: new FormControl('', Validators.compose([

Validators.maxLength(9),
Validators.minLength(9),
Validators.pattern('^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$'),
Validators.required
])),

terms: new FormControl(false, Validators.pattern('true'))
});

}

validaFecha(fc: FormControl){
    if (2020-fc.value.to<18){
        return({validaFecha:true});
    }else{
    return null;}

};



/*Al pulsar el botón submit se llama a este método que recibe como parámetro todos los valores introducidos en el formulario.
Para pasar estos valores a la siguiente página se crea un objeto de la clase NavigationExtras.
Este objeto es un array asociativo donde definimos un campo queryParams, que a su vez es otro array asociativo.
Dentro de queryParams creamos una pareja clave-valor para cada parámetro que queramos pasar a la otra página
El valor asociado a 'user' es un objeto. Siempre que queramos pasar un objeto como parámetro tenemos que pasarlo a JSON.
*/

onSubmit(values){
console.log(values);
let navigationExtras: NavigationExtras = {
queryParams: {
user: JSON.stringify(values),
numero: 3
}
};
this.navCtrl.navigateForward('/user', navigationExtras);
}

}//end_class