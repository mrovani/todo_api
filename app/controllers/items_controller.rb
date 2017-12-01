class ItemsController < ApplicationController
  before_action :set_list, only: [:index, :show, :create, :update, :destroy]

  # GET /lists/:list_id/items
    def index

      render json: @list.items
    end

  #GET /lists/:list_id/items/:id
    def show

      @item = @list.items.find(params[:id])

      render json: @item
    end

  #POST /list/:list_id/items
    def create
      # puts "\n\n==============================="
      # p params
      # puts "===============================\n\n"
      @item = Item.new(item_params)
      @item.list = @list

      if @item.save
        render json: @item, status: :created
      else
        render json: @item.errors, status: :unprocessable_entity
      end

    end

    # PATCH/PUT /lists/:list_id/items/:id
    def update
      @item = @list.items.find(params[:id])

      if @item.update(item_params)
        render json: @item
      else
        render json: @item.errors, status: :unprocessable_entity
      end
    end

    # DELETE /lists/:list_id/items/:id
    def destroy
      @item = @list.items.find(params[:id])
      @item.destroy
      render json: @item
    end

    private
    def set_list
      @list = List.find(params[:list_id])
    end

    def item_params
      params.require(:item).permit(:description, :completed)
    end

end
