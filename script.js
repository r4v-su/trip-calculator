const prices = '{"petrolOn":"7.90","petrol95":"7.60","lpg":"3.42"}';
console.log(prices);

class Calc {
	constructor(data) {
        this.dataJson = JSON.parse(data)
		this.userDataInputs = {
			distance: null,
			consumption: null,
			price: null,
		};
		this.userFuelChoice = null;
		this.fuelButtons = [...document.getElementsByClassName("petrol")];
		this.dataInputs = [...document.getElementsByClassName("form-control")];
		this.priceField = document.getElementById("priceField");
		this.resultField = document.getElementById("resultField");

		this.bindButtonsActions(this.fuelButtons);
		this.bindInputsActions(this.dataInputs);
		this.result = this.calculateTripCost();
	}

	storeUserInputs(input) {
		console.log(input);
		switch (input.name) {
			case "distance":
				this.userDataInputs.distance = input.value;
				break;
			case "consumption":
				this.userDataInputs.consumption = input.value;
				break;
			case "price":
				this.userDataInputs.price = input.value;
				break;
			default:
				return;
		}
	}

	chooseFuel(e) {
		if (e.target.nodeName == "BUTTON") {
			this.userFuelChoice = e.target;
		} else {
			this.userFuelChoice = e.target.closest("BUTTON");
		}
		this.fuelButtons.forEach((button) => {
			if (button === this.userFuelChoice) {
				return;
			} else {
				button.classList.remove("active");
			}
		});

		switch (this.userFuelChoice.name) {
			case "petrolOn":
				{
					this.userFuelChoice.classList.add("active");
					this.userDataInputs.price = this.dataJson.petrolOn;
					this.priceField.value = this.dataJson.petrolOn;
				}
				break;
			case "petrol95":
				{
					this.userFuelChoice.classList.add("active");
					this.userDataInputs.price = this.dataJson.petrol95;
					this.priceField.value = this.dataJson.petrol95;
				}
				break;
			case "LPG":
				{
					this.userFuelChoice.classList.add("active");
					this.userDataInputs.price = this.dataJson.lpg;
					this.priceField.value = this.dataJson.lpg;
				}
				break;
			default:
				break;
		}
	}

	calculateTripCost() {
        let result = (this.userDataInputs?.distance / this.userDataInputs?.consumption * this.userDataInputs?.price);
        this.resultField.setAttribute('placeholder', result)
        } 


	bindButtonsActions(buttons) {
        console.log(buttons)
    buttons.forEach((button) => {
			button.addEventListener("click", (e) => {
				this.chooseFuel(e);
                this.calculateTripCost();
			});
		});
	}

	bindInputsActions(inputs) {
		inputs.forEach((input) => {
			if (input.id == "resultField") {
				return;
			} else {
				input.addEventListener("change", (e) => {
					this.storeUserInputs(input);
                    this.calculateTripCost();
				});
			}
		});
	}
}

new Calc(prices);
