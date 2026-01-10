declare global {
	namespace App {
		interface Locals {
			user?: import('$types').User;
		}
	}
}

export {};
