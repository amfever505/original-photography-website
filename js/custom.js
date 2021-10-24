new fullpage('#fullpage', {
  //Navigation
  //   menu: '#menu',
  //   lockAnchors: false,

  anchors: ['top', 'first', 'about', 'works', 'plan', 'reserve', 'contact'],
  navigationTooltips: ['TOP', 'FIRST', 'ABOUT', 'WORKS', 'PLAN', 'RESERVE', 'CONTACT'],
  fixedElements: '.light-box,.equipment, .footer, .SNS',
  css3: true,
  scrollingSpeed: 500,
  navigation: true,

  navigationPosition: 'left',
  navigationColor: '#E67F7E',
  responsiveHeight: 330,
  responsiveWidth: 0,

  //design
  controlArrows: true,
  verticalCentered: false,
  responsiveSlides: false,
  parallax: false,
  parallaxOptions: { type: 'reveal', percentage: 62, property: 'translate' },
  dropEffect: false,
  dropEffectOptions: { speed: 2300, color: '#F82F4D', zIndex: 9999 },
  waterEffect: false,
  waterEffectOptions: { animateContent: true, animateOnMouseMove: true },
  cards: false,
  cardsOptions: { perspective: 100, fadeContent: true, fadeBackground: true },

  onLeave: function (origin, destination, direction) {
    if (origin.index == 0 && direction == 'down') {
      //セクション１を下にスクロールしたとき実行される
      $('#fp-nav').show();
    } else if (destination.index == 0 && direction == 'up') {
      //セクション1に戻そうとした時実行される
      $('#fp-nav').hide();
    }

    // if (origin.index == 2 || urlHash == '#about') {
    //   $('#quote-box').addClass('active');
    // }
  },
  afterLoad: function (anchorLink, Index) {
    if (Index.index == 2) {
      $('#quote-box').addClass('active');
    } else {
      $('#quote-box').removeClass('active');
    }
  },
});

// fullpage_api.setAllowScrolling(false);
//最終的にはナビが必要なので初期値をtrueに、ここでいらないページにだけ隠す
var urlHash = location.hash; //#からの部分取得
if (urlHash == '') {
  $('#fp-nav').hide();
}

$('.btn-equipment').click(function () {
  $('.equipment').toggle();
});
$('.off-equipment').click(function () {
  $('.equipment').toggle();
});
function popupImg(n) {
  $('#popup-img').attr('src', 'img/nudo/' + n + '.jpg');
  $('.light-box').toggleClass('target');
}
$('.off-popup').click(function () {
  $('.light-box').toggleClass('target');
});
//tag
const PLANS = {
  1: 'pt',
  2: 'studio',
  3: 'event',
};
let prePlan = PLANS[1];
let preNo = 1;
function selectPlan(n) {
  const name = PLANS[n];
  $('#' + prePlan).toggleClass('current');
  console.log(prePlan);
  $('#' + name).toggleClass('current');
  $('#tag' + preNo).toggleClass('current-tag');
  $('#tag' + n).toggleClass('current-tag');
  prePlan = name;
  preNo = n;
}

// promise化したfunction
// const loadImage = (src) => {
//   return new Promise((resolve, reject) => {
//     const img = new Image();
//     img.onload = () => resolve(img);
//     img.onerror = (e) => reject(e);
//     img.src = src;
//   });
// };

// // jQueryで要素を追加する方法
// for (let n = 1; n < 26; n++) {
//   var path = '../NudoNudo/img/nudo/' + n + '.jpg';
//   var ele = '';

//   // promise then/catch
//   loadImage(path)
//     .then((res) => {
//       if (res.height > res.width) {
//         var ele =
//           "<div onclick='popupImg(" +
//           n +
//           ")' class='img-box bg-center' style='background-image: url(img/nudo/" +
//           n +
//           "thumb.jpg); padding-top: 145%;'></div>";
//       } else {
//         var ele =
//           "<div onclick='popupImg(" +
//           n +
//           ")' class='img-box bg-center' style='background-image: url(img/nudo/" +
//           n +
//           "thumb.jpg)'></div>";
//       }
//       $('#gallery').append($(ele));
//     })
//     .catch((e) => {
//       console.log('onload error', e);
//     });
//   console.log(ele);

//   // async/awaith
//   async () => {
//     try {
//       const res = await loadImage(path);
//     } catch (e) {
//       console.log('onload error', e);
//     }
//   };
// }
Promise.all();

jQuery.prototype.mousedragscrollable = function () {
  let target; // 動かす対象
  $(this).each(function (i, e) {
    $(e).mousedown(function (event) {
      event.preventDefault();
      target = $(e); // 動かす対象
      $(e).data({
        down: true,
        move: false,
        x: event.clientX,
        y: event.clientY,
        scrollleft: $(e).scrollLeft(),
        scrolltop: $(e).scrollTop(),
      });
      return false;
    });
    // move後のlink無効
    $(e).click(function (event) {
      if ($(e).data('move')) {
        return false;
      }
    });
  });
  // list要素内/外でのevent
  $(document)
    .mousemove(function (event) {
      if ($(target).data('down')) {
        event.preventDefault();
        let move_x = $(target).data('x') - event.clientX;
        let move_y = $(target).data('y') - event.clientY;
        if (move_x !== 0 || move_y !== 0) {
          $(target).data('move', true);
        } else {
          return;
        }
        $(target).scrollLeft($(target).data('scrollleft') + move_x);
        $(target).scrollTop($(target).data('scrolltop') + move_y);
        return false;
      }
    })
    .mouseup(function (event) {
      $(target).data('down', false);
      return false;
    });
};
$('.sample').mousedragscrollable();

$('#send').click(function () {
  let data = $('#name')[0].value;
  window.alert('送信できました!');
  data = '';
  console.log(data);
});
