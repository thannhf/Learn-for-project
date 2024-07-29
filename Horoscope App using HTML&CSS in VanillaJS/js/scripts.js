  //Hiding these elements because they take up space and make the margins/paddings look off until we run the getHoro function
  document.getElementById('emptyWrapper').style.display = 'none';
  document.getElementById('info').style.display = 'none';
// function runs onClick
function getHoro(userInput) {
  // receiving userInput
  var userInput = document.getElementById('userInput').value;
  // checking if the objects in horos match userInput or not
  var userHoro = horos[userInput.toLowerCase()] || horos['default'];
  console.log(userHoro);
  // writing to the DOM based on what the user typed

  document.getElementById('info').style.display = 'block';
  document.getElementById('emptyWrapper').className = 'mx-auto text-center maxWidth d-block mt-5';
  document.getElementById('title').innerHTML = userHoro.title;
  document.getElementById('title').className = 'mx-auto bg-dark text-light animated rollIn flex-center';
  document.getElementById('img').innerHTML = userHoro.img;
  document.getElementById('img').className = 'mx-auto mt-2 mb-2 rounded-circle img-fluid animated rotateIn flex-center';
  document.getElementById('info').innerHTML = userHoro.info;
  document.getElementById('info').className = 'col-md-8 mt-2 p-2 text-light bg-primary rounded mx-auto letterSpacing animated flipInY flex-center';
  document.getElementById('img').src = userHoro.img;
  //this is for mobile viewing, so we can see the new elements appear live
  document.getElementById('right-picture').scrollIntoView();
}

// list of objects
var horos = {
  aries: {
    title: 'Aries (March 21 - April 19) ',
    info: "You have many strenghts such as courage, determination, confidence, enthusiasm, optimism, honesty,  and passion. Of course your weaknesses are being impatient, moody, short-tempered, impulsive, aggressive. You like comfortable clothes, taking on leadership roles, physical challenges, and individual sports. It's very important that you stay busy because you do not like inactivity, delays, and work that does not use your talents. Each Aries has a task to share their position, power, gold, or physical strength with other people willingly, or the energy will be stopped in its natural flow, fear will take over, and the process of giving and receiving will hold balance at zero.",
    img: 'img/aries.jpg'
    //'http://cdn.playbuzz.com/cdn/82706aea-1849-4a50-85f2-3fc1127cb660/01f605f4-df0b-47e2-a145-4bb8c0aa8422.jpg'
  },
  taurus: {
    title: 'Taurus (April 20 - May 20) ',
    info: "You have many strenghts such as being Reliable, patient, practical, devoted, responsible, stable. However, your weaknesses are being stubborn, possessive, uncompromising. You like gardening, cooking, music, romance, high quality clothes, working with hands. It's very important that you  have consistency because you do not like sudden changes, complications, insecurity of any kind, and synthetic fabrics. To find love, a Taurus has to travel the world, change perspective or make a shift in their entire belief system and their system of values.",
    img: 'img/taurus.jpg'
    //'http://cdn.playbuzz.com/cdn/82706aea-1849-4a50-85f2-3fc1127cb660/de286e40-5db0-4ec4-8a7e-f80457d9c5c6.jpg'
  },

  gemini: {
    title: 'Gemini (May 21 - June 20) ',
    info: 'You have many strenghts such as being gentle, affectionate, curious, adaptable, with an ability to learn quickly and exchange ideas. However, your weaknesses are being nervous, inconsistent, and indecisive. You like music, books, magazines, chats with nearly anyone, short trips around the town. It is very important that you exlpore because you do not like  being alone, being confined, repetition and routine.  You need excitement, variety and passion, and when they find the right person, a lover, a friend and someone to talk to combined into one, they will be faithful and determined to always treasure their heart. Keep your good heart despite feeling overlooked.',
    img: 'img/gemini.jpg'
    //'http://cdn.playbuzz.com/cdn/82706aea-1849-4a50-85f2-3fc1127cb660/babd7de1-89d0-4606-84f7-e47865bce3aa.jpg'
  },

  cancer: {
    title: 'Cancer (June 21 - July 22)',
    info: 'You have many strenghts such as being tenacious, highly imaginative, loyal, emotional, sympathetic, and persuasive. However, your weaknesses are being Moody, pessimistic, suspicious, manipulative, and insecure. You like art, home-based hobbies, relaxing near or in water, helping loved ones, and a good meal with friends . It is very important that you keep private because you do not like strangers, any criticism of Mom, and revealing of your personal life.  When at peace with their life choices, Cancer representatives will be happy and content to be surrounded by a loving family and harmony in their home.  Stay out of trouble and stay in with those you trust.',
    img: 'img/cancer.jpg'
    //'http://cdn.playbuzz.com/cdn/82706aea-1849-4a50-85f2-3fc1127cb660/1f6f4721-5788-4cfc-937e-d092bb4e1772.jpg'
  },

  leo: {
    title: 'Leo (July 23 - August 22)',
    info: 'You have many strenghts such as being creative, passionate, generous, warm-hearted, cheerful, and humorous. However, your weaknesses are being arrogant, stubborn, self-centered, lazy, and inflexible. You like movies, taking holidays, being admired, expensive things, bright colors, and fun with friends. It is very important that you get attention because you do not like Being ignored, facing difficult reality, not being treated like a king or queen.  When a Leo becomes too proud of their achievements and how other people see them, they become an easy target, ready to be taken down. Stay humble and rule the jungle!',
    img: 'img/leo.jpg'
    //'http://cdn.playbuzz.com/cdn/82706aea-1849-4a50-85f2-3fc1127cb660/fdcce561-f792-4453-9d8a-1bff8b39659e.jpg'
  },
  virgo: {
    title: 'Virgo (August 23 - September 22)',
    info: 'You have many strenghts such as being Loyal, analytical, kind, hardworking, and practical. However, your weaknesses are Shyness, worry, being overly critical of self and others, and being all work and no play. You like Animals, healthy food, books, nature, and cleanliness. It is very important that you keep to yourself because you do not like Rudeness, asking for help, and taking center stage. Constantly worried that you missed a detail that will be impossible to fix, you can get stuck in details, becoming overly critical and concerned about matters that nobody else seems to care much about.  Try not to over think and overplan, the best things come unexpectedly!',
    img: 'img/virgo.png'
    // img: 'http://cdn.playbuzz.com/cdn/82706aea-1849-4a50-85f2-3fc1127cb660/6bb51033-9483-4a2f-868f-123326f51a0c.jpg'
    // 'img/virgo.png'
  },
  libra: {
    title: 'Libra (September 23 - October 22)',
    info: 'You have many strenghts such as being Cooperative, diplomatic, gracious, fair-minded, and social. However, your weaknesses are being Indecisive, avoiding confrontations, carrying a grudge, and self-pity . You like Harmony, gentleness, sharing with others, and the outdoors. It is very important that you make a difference because you do not like Violence, injustice, loudmouths, and conformity.Telling us where we went wrong or what we did right, Libras unconsciously teach us that true liberation hides in lightness. Keep doing your best but you have to make a decision to fight or walk away.',
    img: 'img/libra.jpg'
    // 'http://cdn.playbuzz.com/cdn/82706aea-1849-4a50-85f2-3fc1127cb660/960c7cec-74e8-4cfc-9698-acafa7781b45.jpg'
  },

  scorpio: {
    title: 'Scorpio (October 23 - November 21)',
    info: 'You have many strenghts such as being Resourceful, brave, passionate, stubborn, and a true friend. However, your weaknesses are being  Distrusting, jealous, secretive, and violent. You like Truth, facts, being right, longtime friends, teasing, and a grand passion. It is very important that you know the truth because you do not like Dishonesty, revealing secrets, and passive people. Scorpios are brave and therefore they have a lot of friends.  Take a look at the heart, you will find that what is on the outside has decieved you.',
    img: 'img/scorpio.jpg'
    //http://cdn.playbuzz.com/cdn/82706aea-1849-4a50-85f2-3fc1127cb660/8207d5cd-5200-4ebd-a895-352b9ef42a1d.jpg
  },

  sagittarius: {
    title: 'Sagittarius (November 22 - December 21) ',
    info: 'You have many strenghts such as being Generous, idealistic, and have a great sense of humor. However, your weaknesses are Promising more than can deliver, being very impatient, and saying anything no matter how undiplomatic. You like Freedom, travel, philosophy, and being outdoors. It is very important that you are feeling Free because you do not like Clingy people, being constrained, off-the-wall theories, and details. Sagittarius-born are often impatient and tactless when they need to say or do something, so it is important to learn to express themselves in a tolerant and socially acceptable way.  Keep up the good spirits with your sense of humor but you will find yourself looking for something deeper.',
    img: 'img/sagittarius.jpg'
    //http://cdn.playbuzz.com/cdn/82706aea-1849-4a50-85f2-3fc1127cb660/1e0b92f2-972b-4d76-bc1f-3cedd5731045.jpg
  },

  capricorn: {
    title: 'Capricorn (December 22 - January 19)',
    info: 'You have many strenghts such as being Responsible, disciplined, self-control, and a good manager. However, your weaknesses are being a Know-it-all, unforgiving, condescending, and expecting the worst . You like Family, tradition, music, understated status, and quality craftsmanship. It is very important that you   because you do not like Almost everything at some point. You face the world just as you are – brave enough to never run away, but constantly afraid of you inner monsters..  You will Have to learn from your mistakes and get to the top based solely on their experience and expertise.',
    img: 'img/capricorn.jpg'
    //http://cdn.playbuzz.com/cdn/82706aea-1849-4a50-85f2-3fc1127cb660/f0c2c243-3715-4982-88ac-d1dd90a3e12d.jpg
  },

  aquarius: {
    title: 'Aquarius (January 20 - February 18)',
    info: 'You have many strenghts such as being Progressive, original, independent, and humanitarian. However, your weaknesses are running from emotional expression, being temperamental, uncompromising, and aloof. You like Fun with friends, helping others, fighting for causes, intellectual conversation, and a good listener. It is very important that you are successful because you do not like Limitations, broken promises, being lonely, dull or boring situations, and people who disagree with you.  You will find a crossroads when it is time to put away the work or open up to someone you love',
    img: 'img/aquarius.jpg'
    //http://cdn.playbuzz.com/cdn/82706aea-1849-4a50-85f2-3fc1127cb660/c59bb177-716e-409f-85a4-4b13461fa80b.jpg
  },

  pisces: {
    title: 'Pisces (February 19 - March 20)',
    info: 'You have many strenghts such as being Compassionate, artistic, intuitive, gentle, wise, and musical. However, your weaknesses are being Fearful, overly trusting, sad, having the desire to escape reality, and can be a victim or a martyr. You like Being alone, sleeping, music, romance, visual media, swimming, and spiritual themes. It is very important that you find good company because you do not like Know-it-alls, being criticized, the past coming back to haunt, and cruelty of any kind.  You will have a moment of clarity when you realize that seeking attention does not get you as far as being your amazing self!',
    img: 'img/pisces.jpg'
    //http://cdn.playbuzz.com/cdn/82706aea-1849-4a50-85f2-3fc1127cb660/a80e35fa-1348-450f-8e92-ad193cd4a473.jpg
  },
  default: {
    title: 'You entered an invalid zodiac sign.',
    info: 'Try checking the spelling and be sure not to leave a space after your last letter.',
    img: 'img/default.jpg'
    //http://www.callscotland.org.uk/common-assets/images/theme/try-again.png
  }
};

// When user presses ENTER while in the Input, instead of CLICKING the Button
var btn = document.getElementById('userInput');
btn.addEventListener('keypress', function enterKey(e) {
  if (e.keyCode == 13) {
    getHoro();
  }
}, false);
