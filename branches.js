// BRANCHES CHANGE URL
const branchesBlock = document.querySelector(".branches-picker");
const branches = document.querySelectorAll(".branch");
const branchIframe = document.querySelector(".branches-map");
const branchesIframeUrls = [
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2311.180218746836!2d30.74680669317638!3d46.459159938969634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c633d880e8eb89%3A0xae5125add1471600!2z0J7RgNC90LXQu9C70LAg0KLQtdC60YE!5e0!3m2!1sen!2sua!4v1681329162475!5m2!1sen!2sua",
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2749.24981102435!2d30.640811738497842!3d46.44374702262167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c63283e08cf1c1%3A0x8ea58ca7ce998f16!2z0J7RgNC90LXQu9C70LAg0KLQtdC60YEgN9C60LwuINC80LDQs9Cw0LfQuNC9IDMyNw!5e0!3m2!1sen!2sua!4v1681383232471!5m2!1sen!2sua",
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1634.8478270058324!2d30.637148150813434!3d46.439277526430274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c6334fc3d60457%3A0x3250fe8226e502b1!2sOrnella%20Tex!5e0!3m2!1sen!2sua!4v1681383259078!5m2!1sen!2sua",
    "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d6354.6342157656545!2d30.714127521378686!3d46.42689387618085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sua!4v1681382550953!5m2!1sen!2sua",
    "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d8984.340192564181!2d30.750935140981497!3d46.441872326022306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sua!4v1681382577536!5m2!1sen!2sua",
    "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d8987.619063076192!2d30.75773674554656!3d46.421985533014194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sua!4v1681382603876!5m2!1sen!2sua",
];

branchesBlock.addEventListener("click", (e) => {
    if (window.innerWidth < 700) {
        e.preventDefault();
        return;
    }
    branches.forEach((branch, index) => {
        if (
            branchesIframeUrls[index] === branchIframe.src &&
            e.target === branch
        ) {
            e.preventDefault();
            return;
        }
        if (e.target === branch) {
            branchIframe.src = branchesIframeUrls[index];
        }
    });
});
