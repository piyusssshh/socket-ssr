import { useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import ReCaptchaProvider from './reCaptchaProvider';
import Image from 'next/image';

export default function RequestPluginFormComp({ appOneDetails }) {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    console.log('Current URL:', currentUrl);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        useCase: '',
        app_name: currentUrl || ' ',
        plugin: appOneDetails?.name,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.name || !formData.email) {
            alert('Name and Email are required.');
            return;
        }

        if (!executeRecaptcha) {
            console.error('Recaptcha not available');
            return;
        }

        try {
            const token = await executeRecaptcha('plugin_request');
            const recaptchaResponse = await fetch('/api/verify-recaptcha', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            });

            const recaptchaData = await recaptchaResponse.json();

            if (recaptchaData?.success) {
                setIsLoading(true);
                const pluginResponse = await fetch('https://flow.sokt.io/func/scrioitLgnvb', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                const pluginData = await pluginResponse.json();

                if (pluginData?.data?.success) {
                    document.getElementById('beta_request').close();
                }
            }
        } catch (error) {
            console.error('Failed to submit:', error);
        } finally {
            setIsLoading(false);
            document.getElementById('beta_request').close();
        }
    };

    return (
        <>
            <div className="modal-box">
                <form>
                    <button
                        onClick={() => document.getElementById('beta_request').close()}
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    >
                        ✕
                    </button>
                </form>
                <div className="flex flex-col gap-4">
                    <Image
                        src="/assets/brand/logo.svg"
                        width={1080}
                        height={1080}
                        alt="viasocket"
                        className="h-[36px] w-fit"
                    />
                    <h3 className="font-bold text-lg">Please fill the following details</h3>
                    <div className="flex gap-3 flex-col">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Name:</span>
                            </div>
                            <input
                                required
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                className="input input-bordered w-full max-w-xs"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Email:</span>
                            </div>
                            <input
                                required
                                type="text"
                                name="email"
                                placeholder="Enter your Email"
                                className="input input-bordered w-full max-w-xs"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Use Case:</span>
                            </div>
                            <textarea
                                required
                                name="useCase"
                                className="textarea textarea-bordered"
                                placeholder="Please describe your usecase"
                                value={formData.useCase}
                                onChange={handleInputChange}
                            ></textarea>
                        </label>
                        <div className="flex gap-3">
                            <button disabled={isLoading} className="btn btn-md btn-primary" onClick={handleSubmit}>
                                {isLoading ? 'Submiting...' : 'Submit'}
                            </button>
                            <button
                                className="btn btn-md btn-link"
                                onClick={() => document.getElementById('beta_request').close()}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
