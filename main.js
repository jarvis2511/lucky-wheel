(() => {
  const $ = document.querySelector.bind(document);

  let timeRotate = 14500; //10 giây
  let currentRotate = 0;
  let isRotating = false;
  const wheel = $(".wheel");
  const showMsgModal = $(".notification");
  const showMsgContent = $("#notification_content");
  const buttonClose = $(".button-close");
  const test = $("main");
  const listMember = $("#list_member");
  const buttonSubmit = $("#button_submit");
  //=====< Danh sách phần thưởng >=====
  var createList = [];

  buttonSubmit.addEventListener("click", (event) => {
    event.preventDefault();
    const inputValues = listMember.value
      .split("\n")
      .filter((item) => item.trim() !== ""); // Tách chuỗi dựa trên dấu Enter và loại bỏ các chuỗi trống

    const percentValue = 100 / inputValues.length;

    createList = inputValues.map((text) => ({
      text: text.trim(),
      percent: percentValue / 100,
    }));
    var size = createList.length;

    //=====< Số đo góc của 1 phần thưởng chiếm trên hình tròn >=====
    var rotate = 360 / size;
    var skewY = 90 - rotate;

    const test = () => {
      while (wheel.firstChild) {
        wheel.removeChild(wheel.firstChild);
      }
      size = createList.length;

      //=====< Số đo góc của 1 phần thưởng chiếm trên hình tròn >=====
      rotate = 360 / size;

      //=====< Số đo góc cần để tạo độ nghiêng, 90 độ trừ đi góc của 1 phần thưởng chiếm >=====
      skewY = 90 - rotate;
      createList.map((item, index) => {
        //=====< Tạo thẻ li >=====
        const elm = document.createElement("li");

        //=====< Xoay và tạo độ nghiêng cho các thẻ li >=====
        elm.style.transform = `rotate(${
          rotate * index
        }deg) skewY(-${skewY}deg)`;

        //=====< Thêm background-color so le nhau và căn giữa cho các thẻ text>=====
        if (index % 2 == 0) {
          elm.innerHTML = `<p style="transform: skewY(${skewY}deg) rotate(${
            rotate / 2
          }deg);" class="text text-1"><b>${item.text}</b></p>`;
        } else {
          elm.innerHTML = `<p style="transform: skewY(${skewY}deg) rotate(${
            rotate / 2
          }deg);" class="text text-2"><b>${item.text}</b></p>`;
        }
        //=====< Thêm vào thẻ ul >=====
        wheel.appendChild(elm);
      });
    };
    test();
    /********** Hàm bắt đầu **********/
    const rotateWheel = (currentRotate, index) => {
      $(".wheel").style.transform = `rotate(${
        //=====< Góc quay hiện tại trừ góc của phần thưởng>=====
        //=====< Trừ tiếp cho một nửa góc của 1 phần thưởng để đưa mũi tên về chính giữa >=====
        currentRotate - index * rotate - rotate / 2
      }deg)`;
    };

    const start = () => {
      isRotating = true;
      //=====< Lấy 1 số ngầu nhiên 0 -> 1 >=====
      const random = Math.random();

      //=====< Gọi hàm lấy phần thưởng >=====
      const gift = getGift(random);

      //=====< Số vòng quay: 360 độ = 1 vòng (Góc quay hiện tại) >=====
      currentRotate += 360 * 10;

      //=====< Gọi hàm quay >=====
      rotateWheel(currentRotate, gift.index);

      //=====< Gọi hàm in ra màn hình >=====
      showGift(gift);
    };

    /********** Hàm quay vòng quay **********/

    /********** Hàm lấy phần thưởng **********/
    const getGift = (randomNumber) => {
      let currentPercent = 0;
      let list = [];

      createList.forEach((item, index) => {
        //=====< Cộng lần lượt phần trăm trúng của các phần thưởng >=====
        currentPercent += item.percent;

        //=====< Số ngẫu nhiên nhỏ hơn hoặc bằng phần trăm hiện tại thì thêm phần thưởng vào danh sách >=====
        if (randomNumber <= currentPercent) {
          list.push({ ...item, index });
        }
      });

      //=====< Phần thưởng đầu tiên trong danh sách là phần thưởng quay được>=====
      return list[0];
    };

    /********** In phần thưởng ra màn hình **********/
    const showGift = (gift) => {
      let timer = setTimeout(() => {
        isRotating = false;
        showMsgModal.style.display = "block";
        showMsgContent.innerHTML = `
        <p class="content">Nguyễn Hoàng Phúc Hải</p> 
        <div class="blue"><img src="giphy.gif" alt="" /></div> 
      `;
        removeGiftFromList(gift.index);
        clearTimeout(timer);
      }, timeRotate);
    };

    /********** Xoá phần tử ra khỏi mảng **********/
    const removeGiftFromList = (index) => {
      createList.splice(index, 1); // Xoá phần tử tại vị trí index
      size = size - 1;
      test();
    };

    /********** Tắt modal **********/
    buttonClose.addEventListener("click", () => {
      showMsgModal.style.display = "none";
    });

    /********** Sự kiện click button start **********/
    wheel.addEventListener("click", () => {
      !isRotating && start();
    });
  });
})();
