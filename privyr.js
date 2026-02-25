// ========================================
//  PRIVYR UNIVERSAL FORM HANDLER
//  PRODUCTION VERSION (DOUBLE CLICK SAFE)
//  WITH THANK YOU PAGE REDIRECT
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    const PRIVYR_WEBHOOK = "https://www.privyr.com/api/v1/incoming-leads/0vZfjMQw/EiSI5Icf#generic-webhook";
    // 🔥 Replace with your actual Privyr webhook URL

    const THANK_YOU_PAGE = "/thankyou.html"; 
    // 🔥 Change if needed (example: /thank-you/)

    document.querySelectorAll(".form1").forEach(form => {

        form.addEventListener("submit", async function (e) {
            e.preventDefault();

            const submitBtn = form.querySelector("button[type='submit']");

            // 🚫 Prevent double submission
            if (submitBtn.disabled) return;

            const name = form.querySelector("input[name='name1']")?.value.trim();
            const phone = form.querySelector("input[name='phone']")?.value.trim();
            const city = form.querySelector("input[name='City']")?.value.trim();

            if (!name || !phone || !city) {
                Swal.fire({
                    icon: "warning",
                    title: "All fields are required"
                });
                return;
            }

            try {

                // 🔄 Set loading state
                submitBtn.disabled = true;
                submitBtn.innerHTML = "Sending...";

                const response = await fetch(PRIVYR_WEBHOOK, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: name,
                        phone: phone,
                        email: "",
                        source: "JMD Website",
                        custom_fields: {
                            City: city,
                            Page_URL: window.location.href
                        }
                    })
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                // ✅ Redirect to Thank You page for Google Ads tracking
                window.location.href = THANK_YOU_PAGE;

            } catch (error) {

                console.error("Privyr Submission Error:", error);

                Swal.fire({
                    icon: "error",
                    title: "Submission Failed",
                    text: "Please try again."
                });

                // 🔁 Restore button if failed
                submitBtn.disabled = false;
                submitBtn.innerHTML = "Submit";
            }

        });

    });

});