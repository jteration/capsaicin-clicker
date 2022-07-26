export default function (state, action) {
	//TODO Think about a naming convention for constants
	//Master game state
	const blankGame = {
		plants: 10,
		capsaicin: 1,
		plantGains: 0,
		heatGains: 0,
		species: "Bell Pepper",
		helpers: {
			eligibleHelpers: [],
			purchasedHelpers: {
				Gardeners: 0,
				Greenhouses: 0,
				Farms: 0,
				Aquaponics: 0,
				Aeroponics: 0,
				Biodomes: 0,
				Pepper_Forests: 0,
				Pepper_Excavators: 0,
				Madagascar: 0
			}
		},
		progress: 0,
		upgrades: {
			eligibleUpgrades: [],
			purchasedUpgrades: []
		},
		event: []
	};

	switch (action.type) {
		case "GET_LOCAL_STORAGE":
			if (localStorage.payload) {
				//TODO Make it so their save is modified rather than replaced with a blank game
				let game = JSON.parse(localStorage.payload);

				//Ghetto handling of new things to the main state being added
				if (game.helpers.purchasedHelpers.Pepper_Excavators === undefined) {
					game.helpers.purchasedHelpers.Pepper_Excavators = 0;
				}
				if (game.helpers.purchasedHelpers.Madagascar === undefined) {
					game.helpers.purchasedHelpers.Madagascar = 0;
				}
				if (game.plantGains === undefined) {
					game.plantGains = 0;
				}
				if (game.heatGains === undefined) {
					game.heatGains = 0;
				}

				return game;
			}
			return state;
		case "BUTTON_CLICKED":
			let plantGains = 10;

			if (
				action.payload.upgrades.purchasedUpgrades.includes("click_plus_one")
			) {
				plantGains += 2;
			}
			if (
				action.payload.upgrades.purchasedUpgrades.includes("click_plus_ten")
			) {
				plantGains += 10;
			}
			if (
				action.payload.upgrades.purchasedUpgrades.includes("double_click_one")
			) {
				plantGains *= 2;
			}
			if (
				action.payload.upgrades.purchasedUpgrades.includes("double_click_two")
			) {
				plantGains *= 2;
			}
			if (
				action.payload.upgrades.purchasedUpgrades.includes("double_click_three")
			) {
				plantGains *= 2;
			}
			if (
				action.payload.upgrades.purchasedUpgrades.includes("double_click_four")
			) {
				plantGains *= 2;
			}
			if (
				action.payload.upgrades.purchasedUpgrades.includes("click_times_ten")
			) {
				plantGains *= 10;
			}
			if (
				action.payload.upgrades.purchasedUpgrades.includes("double_click_five")
			) {
				plantGains *= 2;
			}
			if (
				action.payload.upgrades.purchasedUpgrades.includes("double_click_six")
			) {
				plantGains *= 2;
			}
			if (
				action.payload.upgrades.purchasedUpgrades.includes(
					"universal_click_times_ten"
				)
			) {
				plantGains *= 10;
			}
			if (
				action.payload.upgrades.purchasedUpgrades.includes("double_click_seven")
			) {
				plantGains *= 2;
			}
			if (
				action.payload.upgrades.purchasedUpgrades.includes("double_click_eight")
			) {
				plantGains *= 2;
			}
			if (
				action.payload.upgrades.purchasedUpgrades.includes("double_click_nine")
			) {
				plantGains *= 2;
			}
			if (
				action.payload.upgrades.purchasedUpgrades.includes("double_click_ten")
			) {
				plantGains *= 2;
			}
			if (
				action.payload.upgrades.purchasedUpgrades.includes(
					"click_times_ten_two"
				)
			) {
				plantGains *= 10;
			}

			action.payload.plants += plantGains;
			return action.payload;
		case "INTERVAL":
			// Intervals at four cycles per second
			let gardnerMultiplier = 0.0025;
			let greenhouseMultiplier = 0.125;
			let farmsMultiplier = 1.25;
			let aquaponicsMultiplier = 25;
			let aeroponicsMultiplier = 250;
			let biodomesMultiplier = 3750;
			let pepperForestMultiplier = 12500;
			let excavatorMultiplier = 125000;
			let madagascarMultiplier = 50000000;

			// Capsaicin increment logic
			let capsaicinMultiplier = 0.000025;

			if (
				action.payload.game.upgrades.purchasedUpgrades.includes(
					"genetic_modifying"
				)
			) {
				capsaicinMultiplier *= 2;
			}

			if (
				action.payload.game.upgrades.purchasedUpgrades.includes(
					"improved_genetics"
				)
			) {
				capsaicinMultiplier *= 2;
			}

			const beforeHeat = action.payload.game.capsaicin;

			action.payload.game.capsaicin =
				action.payload.game.capsaicin +
				action.payload.game.plants * capsaicinMultiplier;

			const afterHeat = action.payload.game.capsaicin;

			action.payload.game.heatGains = (afterHeat - beforeHeat) * 4;

			// Auto-plant creation logic
			if (
				action.payload.game.upgrades.purchasedUpgrades.includes(
					"better_gardeners"
				)
			) {
				gardnerMultiplier *= 2;
			}
			if (
				action.payload.game.upgrades.purchasedUpgrades.includes(
					"better_greenhouses"
				)
			) {
				greenhouseMultiplier *= 2;
			}
			if (
				action.payload.game.upgrades.purchasedUpgrades.includes("better_farms")
			) {
				farmsMultiplier *= 2;
			}
			if (
				action.payload.game.upgrades.purchasedUpgrades.includes(
					"better_aquaponics"
				)
			) {
				aquaponicsMultiplier *= 2;
			}
			if (
				action.payload.game.upgrades.purchasedUpgrades.includes(
					"better_aeroponics"
				)
			) {
				aeroponicsMultiplier *= 2;
			}
			if (
				action.payload.game.upgrades.purchasedUpgrades.includes(
					"better_biodomes"
				)
			) {
				biodomesMultiplier *= 2;
			}
			if (
				action.payload.game.upgrades.purchasedUpgrades.includes(
					"better_forests"
				)
			) {
				pepperForestMultiplier *= 2;
			}
			if (
				action.payload.game.upgrades.purchasedUpgrades.includes(
					"better_excavators"
				)
			) {
				excavatorMultiplier *= 2;
			}
			if (
				action.payload.game.upgrades.purchasedUpgrades.includes(
					"min_max_madagascar"
				)
			) {
				madagascarMultiplier *= 10;
			}
			if (
				action.payload.game.upgrades.purchasedUpgrades.includes(
					"squeeze_madagascar"
				)
			) {
				madagascarMultiplier *= 100;
			}

			// Auto helper creation logic
			//Gardeners
			if (
				action.payload.game.upgrades.purchasedUpgrades.includes(
					"hiring_manager"
				)
			) {
				if (
					action.payload.timer % 4 === 0 &&
					action.payload.game.plants >= 20
				) {
					action.payload.game.plants -= 20;
					action.payload.game.helpers.purchasedHelpers.Gardeners += 1;
				}
			}
			if (
				action.payload.game.upgrades.purchasedUpgrades.includes("hiring_firm")
			) {
				if (
					action.payload.timer % 2 === 0 &&
					action.payload.game.plants >= 150
				) {
					action.payload.game.plants -= 150;
					action.payload.game.helpers.purchasedHelpers.Gardeners += 5;
				}
			}
			if (
				action.payload.game.upgrades.purchasedUpgrades.includes(
					"mass_recruiting"
				)
			) {
				if (
					action.payload.timer % 4 === 0 &&
					action.payload.game.plants >= 1000
				) {
					action.payload.game.plants -= 1000;
					action.payload.game.helpers.purchasedHelpers.Gardeners += 25;
				}
			}
			//Greenhouses
			if (
				action.payload.game.upgrades.purchasedUpgrades.includes("glass_factory")
			) {
				if (
					action.payload.timer % 4 === 0 &&
					action.payload.game.plants >= 200 &&
					action.payload.game.helpers.purchasedHelpers.Gardeners >= 8
				) {
					action.payload.game.plants -= 200;
					if (
						action.payload.game.upgrades.purchasedUpgrades.includes(
							"automated-greenhouses"
						)
					) {
						action.payload.game.helpers.purchasedHelpers.Gardeners -= 4;
					} else {
						action.payload.game.helpers.purchasedHelpers.Gardeners -= 8;
					}
					if (
						action.payload.game.upgrades.purchasedUpgrades.includes(
							"assembly_line"
						)
					) {
						if (
							action.payload.game.upgrades.purchasedUpgrades.includes(
								"kheech_and_khong"
							)
						) {
							action.payload.game.helpers.purchasedHelpers.Greenhouses += 50;
						} else {
							action.payload.game.helpers.purchasedHelpers.Greenhouses += 10;
						}
					} else {
						if (
							action.payload.game.upgrades.purchasedUpgrades.includes(
								"kheech_and_khong"
							)
						) {
							action.payload.game.helpers.purchasedHelpers.Greenhouses += 5;
						} else {
							action.payload.game.helpers.purchasedHelpers.Greenhouses += 1;
						}
					}
				}
			}
			//Farms
			if (
				action.payload.game.upgrades.purchasedUpgrades.includes(
					"corporate_farms"
				)
			) {
				if (
					action.payload.timer % 4 === 0 &&
					action.payload.game.helpers.purchasedHelpers.Greenhouses >= 10 &&
					action.payload.game.plants >= 2000
				) {
					action.payload.game.helpers.purchasedHelpers.Greenhouses -= 4;
					action.payload.game.plants -= 2000;
					action.payload.game.helpers.purchasedHelpers.Farms += 1;
				}
			}

			const beforePlants = action.payload.game.plants;

			action.payload.game.plants =
				action.payload.game.plants +
				action.payload.game.helpers.purchasedHelpers.Gardeners *
					gardnerMultiplier +
				action.payload.game.helpers.purchasedHelpers.Greenhouses *
					greenhouseMultiplier +
				action.payload.game.helpers.purchasedHelpers.Farms * farmsMultiplier +
				action.payload.game.helpers.purchasedHelpers.Aquaponics *
					aquaponicsMultiplier +
				action.payload.game.helpers.purchasedHelpers.Aeroponics *
					aeroponicsMultiplier +
				action.payload.game.helpers.purchasedHelpers.Biodomes *
					biodomesMultiplier +
				action.payload.game.helpers.purchasedHelpers.Pepper_Forests *
					pepperForestMultiplier +
				action.payload.game.helpers.purchasedHelpers.Pepper_Excavators *
					excavatorMultiplier +
				action.payload.game.helpers.purchasedHelpers.Madagascar *
					madagascarMultiplier;

			const afterPlants = action.payload.game.plants;

			action.payload.game.plantGains = (afterPlants - beforePlants) * 4;

			// //Progress logic
			// if (action.payload.plants >= 100 && action.payload.progress < 1) {
			//   action.payload.progress = 1;
			// }
			// if (action.payload.plants >= 1000 && action.payload.progress < 2) {
			//   action.payload.progress = 2;
			// }
			// if (action.payload.plants >= 2000 && action.payload.progress < 3) {
			//   action.payload.progress = 3;
			// }
			// if (action.payload.capsaicin >= 4000 && action.payload.progress < 4) {
			//   action.payload.progress = 4;
			// }
			// if (action.payload.capsaicin >= 8000 && action.payload.progress < 5) {
			//   action.payload.progress = 5;
			// }
			// if (action.payload.capsaicin >= 20000 && action.payload.progress < 6) {
			//   action.payload.progress = 6;
			// }
			return action.payload.game;
		case "SPECIES": {
			return state;
		}
		case "HIRE_GARDNER": {
			return state;
		}
		case "BUY_GREENHOUSE": {
			return state;
		}
		case "BUY_FARM": {
			return state;
		}
		case "BUY_AQUAPONICS": {
			return state;
		}
		case "BUY_AEROPONICS": {
			return state;
		}
		case "BUY_BIODOME": {
			return state;
		}
		case "BUY_FOREST": {
			return state;
		}
		case "BUY_EXCAVATOR": {
			return state;
		}
		case "BUY_MADAGASCAR": {
			return state;
		}
		case "CHECK_HELPERS": {
			return state;
		}
		case "PROGRESS": {
			return state;
		}
		case "CHECK_EVENT": {
			return state;
		}
		case "SET_LOCAL_STORAGE": {
			localStorage.setItem("payload", JSON.stringify(action.payload));
			return state;
		}
		case "CHECK_UPGRADE": {
			return state;
		}
		case "PURCHASE_UPGRADE": {
			return state;
		}
		case "RESET": {
			return blankGame;
		}
		default:
			return blankGame;
	}
}
