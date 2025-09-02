const messages = {
  name: {
    required: "Nama wajib diisi",
    minLength: "Nama minimal 3 karakter",
    maxLength: "Nama maksimal 50 karakter",
  },

  email: {
    required: "Email wajib diisi",
    invalid: "Format email tidak valid",
    minLength: "Email minimal 3 karakter",
    maxLength: "Email maksimal 50 karakter",
  },

  phone: {
    digitsOnly: "Nomor telepon hanya boleh berisi angka",
    required: "Nomor telepon wajib diisi",
    minLength: "Nomor telepon minimal 7 karakter",
    maxLength: "Nomor telepon maksimal 20 karakter",
  },

  address: {
    required: "Alamat wajib diisi",
    minLength: "Alamat minimal 3 karakter",
    maxLength: "Alamat maksimal 50 karakter",
  },

  password: {
    required: "Kata sandi wajib diisi",
    minLength: "Kata sandi minimal 8 karakter",
    maxLength: "Kata sandi maksimal 50 karakter",
  },
};

export default messages;
