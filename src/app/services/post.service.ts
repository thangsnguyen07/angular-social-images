import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  _posts: any[] = [
    {
      id: 1,
      image:
        'https://i.pinimg.com/236x/42/7a/40/427a4012bc1118a935c2f72af3c339ec.jpg',
      name: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    },
    {
      id: 2,
      title: '▷ Las IMAGENES Más CHISTOSAS para Grupos de Whatsapp',
      image:
        'https://i.pinimg.com/236x/09/21/5b/09215b03a60adb302afa2502e1c00272.jpg',
      name: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    },
    {
      id: 3,
      image:
        'https://i.pinimg.com/236x/0e/46/56/0e465663090b2f0cfef65b9a6ea60dd1.jpg',
      name: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of ",
    },
    {
      id: 4,
      image:
        'https://i.pinimg.com/236x/09/7d/d4/097dd45dbc998e0d043f8bd002b17eb1.jpg',
      name: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
    },
    {
      id: 5,
      image:
        'https://i.pinimg.com/236x/3f/18/ad/3f18adcf33d423eebf9230152424199e.jpg',
      name: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.',
    },
    {
      id: 6,
      image:
        'https://i.pinimg.com/236x/dc/5b/1d/dc5b1d3f369157a309e564b7df99de90.jpg',
      name: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using',
    },
    {
      id: 7,
      image:
        'https://i.pinimg.com/236x/b8/3a/9a/b83a9afdf63df9cd0338bfa34a4843bf.jpg',
      name: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using',
    },
    {
      id: 8,
      image:
        'https://i.pinimg.com/236x/38/4d/b9/384db940039da0f3dbb49f3e1d77eb16.jpg',
      name: 'Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
    },
    {
      id: 9,
      image:
        'https://i.pinimg.com/236x/c7/c8/79/c7c8792d8c48d8cf2fe565666c97409e.jpg',
      name: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur,',
    },
    {
      id: 10,
      image:
        'https://i.pinimg.com/236x/f2/fd/ed/f2fded9d03209b1bcca9d4d2f521cdd6.jpg',
      name: 'Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
    },
    {
      id: 11,
      image:
        'https://i.pinimg.com/236x/93/88/25/93882568b7ca2f66aac9a42a0d6dbdd2.jpg',
      name: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    },
    {
      id: 12,
      image:
        'https://i.pinimg.com/236x/eb/54/26/eb5426a8287759de9f782bdf64c3792a.jpg',
      name: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    },
    {
      id: 13,
      image:
        'https://i.pinimg.com/236x/58/7a/5e/587a5e03ee721a094352e1ee3d4cfc37.jpg',
      name: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of ",
    },
    {
      id: 14,
      image:
        'https://i.pinimg.com/236x/58/7a/5e/587a5e03ee721a094352e1ee3d4cfc37.jpg',
      name: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
    },
    {
      id: 15,
      image:
        'https://i.pinimg.com/236x/83/76/17/837617d021322ee6dcec0d55e411ef3b.jpg',
      name: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.',
    },
    {
      id: 16,
      image:
        'https://i.pinimg.com/236x/42/6c/9f/426c9f703db8ad3daea9342d87922382.jpg',
      name: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using',
    },
    {
      id: 17,
      image:
        'https://i.pinimg.com/236x/4d/2f/56/4d2f568ab10103c78c0da33090218605.jpg',
      name: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using',
    },
    {
      id: 18,
      image:
        'https://i.pinimg.com/236x/ce/ce/23/cece233fbc7568d1c3a83e062b66e7c2.jpg',
      name: 'Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
    },
    {
      id: 19,
      image:
        'https://i.pinimg.com/236x/eb/54/26/eb5426a8287759de9f782bdf64c3792a.jpg',
      name: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur,',
    },
    {
      id: 20,
      image:
        'https://i.pinimg.com/236x/ce/ce/23/cece233fbc7568d1c3a83e062b66e7c2.jpg',
      name: 'Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
    },
  ];
  constructor() {}

  get posts() {
    return this._posts;
  }

  getPost(id: string) {
    let post = this.posts.find((post) => post.id.toString() === id);
    return post;
  }
}
