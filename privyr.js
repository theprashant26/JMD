// ========================================
//  PRIVYR UNIVERSAL FORM HANDLER
//  FINAL STABLE VERSION
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    const PRIVYR_WEBHOOK = "https://www.privyr.com/api/v1/incoming-leads/0vZfjMQw/EiSI5Icf";
    const THANK_YOU_PAGE = "/thankyou.html";

    document.querySelectorAll(".form1").forEach(form => {

        form.addEventListener("submit", async function (e) {
            e.preventDefault();

            const submitBtn = form.querySelector("button[type='submit']");
            if (!submitBtn || submitBtn.disabled) return;

            const originalText = submitBtn.innerHTML;

            const name = form.querySelector("input[name='name1']")?.value.trim();
            const phone = form.querySelector("input[name='phone']")?.value.trim();
            const email = form.querySelector("input[name='email']")?.value.trim();
            const city = form.querySelector("input[name='City']")?.value.trim();
            const visitDate = form.querySelector("input[name='visit_date']")?.value;

            if (!name || !phone || !email || !city || !visitDate) {
                Swal.fire({
                    icon: "warning",
                    title: "All fields are required"
                });
                return;
            }

            try {

                submitBtn.disabled = true;
                submitBtn.innerHTML = "Sending...";

                const response = await fetch(PRIVYR_WEBHOOK, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name,
                        phone,
                        email,
                        source: "JMD Website",
                        custom_fields: {
                            City: city,
                            Visit_Date: visitDate,
                            Page_URL: window.location.href
                        }
                    })
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error("Privyr Error Response:", errorText);
                    throw new Error("Submission failed");
                }

                window.location.href = THANK_YOU_PAGE;

            } catch (error) {

                console.error("Privyr Submission Error:", error);

                Swal.fire({
                    icon: "error",
                    title: "Submission Failed",
                    text: "Please try again."
                });

                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }

        });

    });

});