import axios from "axios";

export const verifyCaptcha = async (captchaToken) => {
	if (!captchaToken) return false;

	try {
		const secret = process.env.RECAPTCHA_SECRET_KEY; // add to your .env file
		const res = await axios.post(
			`https://www.google.com/recaptcha/api/siteverify`,
			null,
			{
				params: {
					secret,
					response: captchaToken,
				},
			}
		);

		return res.data.success;
	} catch (error) {
		console.error("Captcha verification failed", error);
		return false;
	}
};
