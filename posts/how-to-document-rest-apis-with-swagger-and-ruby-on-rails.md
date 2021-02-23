---
title: "Write Beautiful REST Documentation with Swagger"
date: "2021-02-23"
published: true
tags:
  - swagger
---

[[snippet]]
| Swagger là một tool hỗ trợ trong việc thiết kế Api một cách dễ dàng. Swagger cho phép | bạn miêu tả cấu trúc Api của bạn, nó sẽ giúp cho cấu trúc Api của bạn được xây dựng 1 | cách đẹp trực quan và có thể tương tác với tài liệu API.

## Demo:

1. Chuẩn bị project:

>     rails new swagger-demo --api

>     rails generate model Pet name photo_url status

 2. Tạo model models/pet.rb:

>     class Pet < ApplicationRecord
>     end

 3. Tạo api CRUD cho pets:
Chạy lệnh sau để rails tự động generate controller:

> rails generate scaffold_controller api/v1/pets

    class Api::V1::PetsController < ApplicationController
      before_action :set_pet, only: [:show, :update, :destroy]
      
      # GET /api/v1/pets
      def index
        @pets = Pet.all
        render json: @pets
      end

      # GET /api/v1/pets/1
      def show
        render json: @pet.to_json(only: [:id, :name, :status, :photo_url])
      end

      # POST /api/v1/pets
      def create
        @pet = Pet.new(pet_params)
        if @pet.save
          render json: @pet.to_json(only: [:id, :name, :status, :photo_url]), status: :created
        else
          render json: @pet.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /api/v1/pets/1
      def update
        if @pet.update(pet_params)
          render json: @pet
        else
          render json: @pet.errors, status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/pets/1
      def destroy
        @pet.destroy
      end

      private
      # Use callbacks to share common setup or constraints between actions.
      def set_pet
        @pet = Pet.find(params[:id])
      end
      # Only allow a trusted parameter "white list" through.
      def pet_params
        params.fetch(:pet).permit(:name, :status, :photo_url)
      end
    end


## Setup rswag gem:

1. Thêm rswag và rspec-rails vào Gemfile:

> Gemfile

    group :development, :test do
      gem 'rspec-rails', '~> 3.5'
    end
    gem 'rswag'

2. Bundle và chạy generator:

> bundle install

> rails generate rspec:install

> rails g rswag:install

3. Tạo file pets_spec.rb và copy đoạn code sau:

> spec/integration/pets_spec.rb

    require 'swagger_helper'

    describe 'Pets API' do

      path '/api/v1/pets' do

        post 'Creates a pet' do
          tags 'Pets'
          consumes 'application/json', 'application/xml'
          parameter name: :pet, in: :body, schema: {
            type: :object,
            properties: {
              name: { type: :string },
              photo_url: { type: :string },
              status: { type: :string }
            },
            required: [ 'name', 'status' ]
          }

          response '201', 'pet created' do
            let(:pet) { { name: 'Dodo', status: 'available' } }
            run_test!
          end

          response '422', 'invalid request' do
            let(:pet) { { name: 'foo' } }
            run_test!
          end
        end
      end

      path '/api/v1/pets/{id}' do

        get 'Retrieves a pet' do
          tags 'Pets'
          produces 'application/json', 'application/xml'
          parameter name: :id, :in => :path, :type => :string

          response '200', 'name found' do
            schema type: :object,
              properties: {
                id: { type: :integer, },
                name: { type: :string },
                photo_url: { type: :string },
                status: { type: :string }
              },
              required: [ 'id', 'name', 'status' ]

            let(:id) { Pet.create(name: 'foo', status: 'bar', photo_url: 'http://example.com/avatar.jpg').id }
            run_test!
          end

          response '404', 'pet not found' do
            let(:id) { 'invalid' }
            run_test!
          end
        end
      end
    end

4. Generate file Swagger theo định dạng JSON bằng lệnh sau:

> rake rswag:specs:swaggerize

5. Truy cập đường dẫn sau và nhận được kết quả:

> http://localhost:3000/api-docs


[[image_caption | swagger ]]
| ![Compare](https://user-images.githubusercontent.com/67262392/108799296-8b884180-75c2-11eb-913c-b10f26445e4e.png)

[[author | Nhật Huy ]]
